import "./list.css"
import './filter.css'
import SearchItem from "./SearchItem"
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import "./searchItem.css";
import { useLocation, useNavigate } from "react-router-dom";
import { filters } from '../../data/filterData';
import api from '../../api/AxiosConfig.js';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';
import Navbar from "../../components/navbar/Navbar.jsx";
import Header from "../../components/header/Header.jsx";

const List = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const [loading, setLoading] = useState(false);
    const [hotels, setHotels] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        renderHotels()
    }, [location.search]);

    async function renderHotels() {
        setLoading(true);
        try {
            const response = await api.get(location.pathname + location.search);
            setHotels(response.data.content);
            setCurrentPage(response.data.number + 1);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.log(error.response);
        }
        setLoading(false);
    }

    const handleFilter = (value, sectionId) => {
        searchParams.set('page', 0);
        let filterValue = searchParams.getAll(sectionId);
        if (filterValue.length > 0 && filterValue[0].split(',').includes(value)) {
            filterValue = filterValue[0].split(',').filter(item => item !== value);
            if (filterValue.length === 0) {
                searchParams.delete(sectionId);
            }
        } else {
            filterValue.push(value);
        }
        if (filterValue.length > 0) {
            searchParams.set(sectionId, filterValue.join(','));
        }
        const query = searchParams.toString();
        navigate({ search: `?${query}` });
    }
    const startDateString = searchParams.get('start_date');
    const endDateString = searchParams.get('end_date');
    
    // Chuyển đổi chuỗi ngày thành đối tượng Date hoặc Moment (nếu sử dụng thư viện moment.js)
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);
    
    // Tính số ngày bằng cách lấy hiệu của ngày kết thúc và ngày bắt đầu
    const numberOfDays = Math.floor((endDate - startDate) / (1000 * 60 * 60 * 24))

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    // price range
    // const [rangeValue, setRangeValue] = useState(2000000); // Giá trị mặc định của thanh trượt

    // const handleRangeChange = (event) => {
    //     setRangeValue(event.target.value);
    // };
    const isItemsEmpty = hotels.length === 0;
    return (
        <div className="list_hotels">
            <Navbar />
            <Header showTitle={false} />
            {loading && <LoadingSpinner />}

            <div className="listFilter">
                <div className="listContainer">
                    <div className="leftP">
                        <div className="listWrapper">
                            <div className="listSearch">
                                <h2 className="lsT">Chọn lọc theo:</h2>
                            </div>
                        </div>
                        {/* <div className="listWrapper">
                            <div className="listSearch">
                                <h3 className="lsTitle">Ngân sách tối đa của bạn (mỗi đêm)</h3>
                                <div>
                                    <label htmlFor="filterRange">VND {(rangeValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</label>
                                    <input type="range" id="filterRange" name="filterRange" min="0" max="4000000" value={rangeValue} onChange={handleRangeChange} />
                                </div>
                            </div>
                        </div> */}
                        {filters.map(filter => (
                            <div key={filter.id} className="listWrapper">
                                <div className="listSearch">
                                    <h3 className="lsTitle">{filter.name} </h3>
                                    <div className="lsItem">
                                        {filter.options.map(option => (
                                            <div key={option.value} className="form-check">
                                                <input className="form-check-input" type="checkbox"
                                                    value={option.value} id={option.value}
                                                    onChange={() => handleFilter(option.value, filter.id)} />
                                                <label className="form-check-label" htmlFor={option.value}>
                                                    {option.label}
                                                </label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="rightP">
                        {isItemsEmpty ? (
                            <div className="notFoundPage">
                                <div> 
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="50"
                                    height="50"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="notFoundIcon"
                                >
                                    <circle cx="11" cy="11" r="8" />
                                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                </svg>
                                <p className="notFound1">Không tìm thấy kết quả</p>
                                <p className="notFound2">Không có kết quả phù hợp với tìm kiếm của bạn. Hãy thử lại.</p>
                                </div>
                            </div>
                            
                        ) : (
                            <div className="sitem">
                                {hotels.map(hotel =>
                                (
                                    <SearchItem key={hotel.id}
                                        hotel = {hotel}
                                        location = {location}
                                    />
                                )
                                )}
                                <div className="pagiContainer">
                                    <div className="pagi">
                                        <Pagination
                                            currentPage={currentPage}
                                            totalPages={totalPages}
                                            searchParams={searchParams}
                                            onPageChange={handlePageChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                    </div>
                </div>

            </div>
        </div>
    );
};

export default List;
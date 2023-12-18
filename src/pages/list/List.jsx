// import { Navbar } from "react-bootstrap"
import { FormCheck } from "react-bootstrap";
import "./list.css"
import './filter.css'
import SearchItem from "./SearchItem"
import { useEffect, useState } from 'react';
import Pagination from './Pagination';
import "./searchItem.css";
import Filter from './Filter.jsx'
import { useLocation, useNavigate } from "react-router-dom";
import { filters } from '../../data/filterData';
import api from '../../api/AxiosConfig.js';
import LoadingSpinner from '../../components/loading-spinner/LoadingSpinner';

// import Navbar from '../../components/navbar/Navbar.jsx'
const List = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    // rating
    function RatingComponent({ rating }) {
        let textToShow;

        if (rating >= 9.0) {
            textToShow = "Tuyệt hảo";
        } else if (rating >= 8.0) {
            textToShow = "Rất tốt";
        } else if (rating >= 7.0) {
            textToShow = "Tốt";
        } else if (rating >= 6.0) {
            textToShow = "Dễ chịu";
        } else textToShow = "Bình thường"

        return textToShow;
    }
    // star
    const renderStars = (value) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            stars.push(
                <span key={i} style={{ color: i < value ? '#FFD700' : '#C0C0C0' }}>
                    &#9733; {/* Dấu sao */}
                </span>
            );
        }
        return stars;
    };

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
            setCurrentPage(response.data.number+1);
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

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }

    const [rangeValue, setRangeValue] = useState(2000000); // Giá trị mặc định của thanh trượt

    const handleRangeChange = (event) => {
        setRangeValue(event.target.value);
    };

    return (
        <div className="list_hotels">
            {loading && <LoadingSpinner />}
            {/* <Navbar /> */}
            <div className="listFilter">
                <div className="listContainer">
                    <div className="listWrapper">
                        <div className="listSearch">
                            <h2 class="lsT">Chọn lọc theo:</h2>
                        </div>
                    </div>
                    <div className="listWrapper">
                        <div className="listSearch">
                            <h3 className="lsTitle">Ngân sách tối đa của bạn (mỗi đêm)</h3>
                            <div>
                                <label htmlFor="filterRange">VND {(rangeValue).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</label>
                                <input type="range" id="filterRange" name="filterRange" min="0" max="4000000" value={rangeValue} onChange={handleRangeChange} />
                            </div>
                        </div>
                    </div>
                    {filters.map(filter => (
                        <div className="listWrapper">
                            <div className="listSearch">
                                <h3 className="lsTitle">{filter.name} </h3>
                                <div className="lsItem">
                                    {filter.options.map(option => (
                                        <div class="form-check">
                                            <input class="form-check-input" type="checkbox"
                                                value={option.value} id={option.value}
                                                onChange={() => handleFilter(option.value, filter.id)} />
                                            <label class="form-check-label" for={option.value}>
                                                {option.label}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="listContainer">
                <div>
                    <div className="sitem">
                        {hotels.map(hotel =>
                        (<div className="searchItem">
                            <img
                                src={hotel.photos[0]}
                                alt=""
                                className="siImg"
                            />
                            <div className="siDesc">
                                <div className="Title">
                                    <h1 className="siTitle">{hotel.name}</h1>
                                    <div className="star">
                                        {renderStars(hotel.star)}
                                    </div>
                                </div>
                                <div className="siDistance">
                                    <a id="diachi" href="">{hotel.address}</a>
                                    <a href="">Xem tren ban do</a>
                                </div>
                                <span className="siTaxiOp">Free airport taxi</span>
                                <span className="siSubtitle">
                                    Studio Apartment with Air conditioning
                                </span>
                                <span className="siFeatures">
                                    Entire studio • 1 bathroom • 21m² 1 full bed
                                </span>
                                <span className="siCancelOp">Free cancellation </span>
                                <span className="siCancelOpSubtitle">
                                    You can cancel later, so lock in this great price today!
                                </span>
                            </div>
                            <div className="siDetails">
                                <div className="siRating">
                                    <RatingComponent className="nhanXet" rating={hotel.rating}></RatingComponent>
                                    <button>{hotel.rating}</button>
                                </div>
                                <div className="siDetailTexts">
                                    <span className="siPrice">Liên hệ</span>
                                    <span className="siTaxOp">Includes taxes and fees</span>
                                    <button className="siCheckButton">See availability</button>
                                </div>
                            </div>
                        </div>
                        )
                        )}

                    </div>

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
        </div>
    );
};

export default List;
// import { Navbar } from "react-bootstrap"
import { FormCheck } from "react-bootstrap";
import "./list.css"
import SearchItem from "./SearchItem"
import {useState} from 'react';
// import Pagination from 'react-bootstrap/Pagination';
import Pagination from './Pagination';
// import Sliders from './Slider'
// import Slider from 'bootstrap-slider'
const List = () => {
    // filter range
    const [rangeValue, setRangeValue] = useState(50); // Giá trị mặc định của thanh trượt

    const handleRangeChange = (event) => {
      setRangeValue(event.target.value);
    };
// Phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = 120; // Tổng số item
    const itemsPerPage = 10; // Số item trên mỗi trang

    const handlePageChange = (page) => {
    setCurrentPage(page);
    }
    return (
        <div>
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
                        <input type="range" id="filterRange" name="filterRange" min="0" max="4000000" value={rangeValue} onChange={handleRangeChange}/>
                    </div> 
                </div>
            </div>
                <div className="listWrapper">
                    <div className="listSearch">
                        <h3 className="lsTitle">Xếp hạng chỗ nghỉ</h3>
                        <div className="lsItem">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
                                <label class="form-check-label" for="flexCheckDefault">
                                    1 sao
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="2sao"/>
                                <label class="form-check-label" for="2sao">
                                    2 sao
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="3sao"/>
                                <label class="form-check-label" for="3sao">
                                    3 sao
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="4sao"/>
                                <label class="form-check-label" for="4sao">
                                    4 sao
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="5sao"/>
                                <label class="form-check-label" for="5sao">
                                    5 sao
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="listWrapper">
                    <div className="listSearch">
                        <h3 className="lsTitle">Tiện nghi</h3>
                        <div className="lsItem">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="GiaDinh"/>
                                <label class="form-check-label" for="GiaDinh">
                                    Phòng gia đình
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="HutThuoc"/>
                                <label class="form-check-label" for="HutThuoc">
                                    Phòng hút thuốc
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="DoXe"/>
                                <label class="form-check-label" for="DoXe">
                                    Chỗ đỗ xe
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="Wifi"/>
                                <label class="form-check-label" for="Wifi">
                                    Wifi miễn phí
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="vatNuoi"/>
                                <label class="form-check-label" for="vatNuoi">
                                    Cho phép mang theo vật nuôi
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="listWrapper">
                    <div className="listSearch">
                        <h3 className="lsTitle">Tiện nghi phòng</h3>
                        <div className="lsItem">
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="nhinBien"/>
                                <label class="form-check-label" for="nhinBien">
                                    Nhìn ra biển
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="tamRieng"/>
                                <label class="form-check-label" for="tamRieng">
                                    Phòng tắm riêng
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="HoBoi"/>
                                <label class="form-check-label" for="HoBoi">
                                    Hồ bơi riêng
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="BanCong"/>
                                <label class="form-check-label" for="BanCong">
                                    Ban công
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="checkbox" value="" id="DieuHoa"/>
                                <label class="form-check-label" for="DieuHoa">
                                    Điều hòa không khí
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="listContainer">
            <div>
      <div className="sitem">
        {Array.from({ length: itemsPerPage }, (_, index) => (
          <div key={index + (currentPage - 1) * itemsPerPage}>
            <div className="listContainer"></div>
            <SearchItem />
          </div>
        ))}
      </div>

      <div className="pagi">
      <Pagination
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
      </div>
    </div>
            </div>
        </div>
    );
};

export default List;
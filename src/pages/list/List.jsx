// import { Navbar } from "react-bootstrap"
import { FormCheck } from "react-bootstrap";
import "./list.css"
import SearchItem from "./SearchItem"
import {useState} from 'react';
import Pagination from 'react-bootstrap/Pagination';
// import Sliders from './Slider'
// import Slider from 'bootstrap-slider'
const List = () => {
    <script src="https://code.jquery.com/jquery-latest.js"></script>
    
    return (
        <div>
            <div className="listContainer">
                
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
                        <SearchItem/>
                        <SearchItem/>
                        <SearchItem/>
                        <SearchItem/>
                        <SearchItem/>
                <div className="pagi">
                    <Pagination>
                        <Pagination.First />
                        <Pagination.Prev />
                        <Pagination.Item>{1}</Pagination.Item>
                        <Pagination.Ellipsis />

                        <Pagination.Item>{10}</Pagination.Item>
                        <Pagination.Item>{11}</Pagination.Item>
                        <Pagination.Item>{12}</Pagination.Item>
                        <Pagination.Item>{13}</Pagination.Item>
                        <Pagination.Item>{14}</Pagination.Item>

                        <Pagination.Ellipsis />
                        <Pagination.Item>{20}</Pagination.Item>
                        <Pagination.Next />
                        <Pagination.Last />
                    </Pagination>
                </div>
            </div>
        </div>
    )
}

export default List;
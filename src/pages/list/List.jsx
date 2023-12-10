// import { Navbar } from "react-bootstrap"
import { FormCheck } from "react-bootstrap";
import "./list.css"
import SearchItem from "./SearchItem"
import { useState } from 'react';
import Pagination from './Pagination';
import { hotels } from "../../data/hotelsData.js"
import "./searchItem.css";
import Filter from '../../components/filter/Filter.jsx'
// import Navbar from '../../components/navbar/Navbar.jsx'
const List = () => {
    // rating
    function RatingComponent({ rating }) {
        let textToShow;
      
        if (rating >= 9.0) {
          textToShow = "Tuyệt hảo";
        } else if (rating >= 8.0) {
          textToShow = "Rất tốt";
        } else if(rating >= 7.0){
          textToShow = "Tốt";
        } else if(rating >= 6.0){
            textToShow = "Dễ chịu";
        }   else textToShow = "Bình thường"
      
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
    // Phan trang
    const [currentPage, setCurrentPage] = useState(1);
    const totalItems = 40; // Tổng số item
    const itemsPerPage = 10; // Số item trên mỗi trang

    const handlePageChange = (page) => {
        setCurrentPage(page);
    }
    return (
        <div>
            {/* <Navbar /> */}
            <div className="listFilter">
           <Filter />
           </div>
            <div className="listContainer">
                <div>
                    <div className="sitem">
                        {hotels.map(hotel =>
                        (<div className="searchItem">
                            <img
                                src={hotel.photos[2]}
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
                                    <RatingComponent className="nhanXet" rating = {hotel.rating}></RatingComponent>
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
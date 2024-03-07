import "./hotel.css";
import React, { useEffect } from 'react';
import Navbar from "../../navbar/Navbar";
import Footer from "../../footer/Footer";
import Email from "../../email/Email";
import { RatingComponent } from "../list/SearchItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../../api/AxiosConfig";
import Badges from "./Badge";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Table from "./Table";
import CardSlick from "./CardSlick";
import { useLocation, useParams } from "react-router-dom";
import SearchBar from "./SearchBar";

const Hotel = () => {
  const { hotelId } = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState({});
  const [showRooms, setShowRooms] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    async function loadHotelData() {
      try {
        if (!searchParams.get('checkIn')) setShowRooms(false);
        const response = await api.get(`/business/hotels/${hotelId}`);
        setHotel(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadHotelData();
  }, [])
  const rStars = (value) => {
    const stars = [];
    if (value > 0) {
      for (let i = 0; i < value; i++) {
        stars.push(
          <span key={i} style={{ color: '#FFD700' }}>
            &#9733;
          </span>
        );
      }
    }
    return stars;
  };

  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? hotel.photos.length - 1 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === hotel.photos.length - 1 ? 0 : slideNumber + 1;
    }
    setSlideNumber(newSlideNumber)
  };

  return (

    <div className="hotel">
      <div className='fixed-navbar'><Navbar /></div>
      <div className="hotelContainer">
        {open && (
          <div className="slider">
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="close"
              onClick={() => setOpen(false)} />
            <FontAwesomeIcon
              icon={faCircleArrowLeft}
              className="arrow"
              onClick={() => handleMove("l")} />
            <div className="sliderWrapper">
              <img src={hotel.photos[slideNumber]} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")} />
          </div>
        )}
        <div className="hotelWrapper">
          <div className="siRating rating">
            <span className="cmt"><RatingComponent rating={hotel.rating}></RatingComponent></span>
            <button>{hotel.rating?.toFixed(1)}</button>
          </div>
          <h1 className="hotelTitle">{hotel.name} {rStars(hotel.star)}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} style={{ color: "#0071C2" }} />
            <span>{hotel.address}</span>
          </div>
          <span className="hotelDistance">
            Vị trí xuất sắc - Nằm ngay trên bản đồ
          </span>
          <span className="hotelPriceHighlight">
            Chúng tôi luôn tận tâm
          </span>
          <div className="hotelImages">
            {hotel.photos?.map((photoSrc, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photoSrc}
                  alt=""
                  className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h3 className="hotelTitle">Những tiện nghi được ưa chuộng nhất</h3>
              <Badges hotelFacilites={hotel.facilities} />
              <h3 className="hotelTitle">Mô tả về chỗ nghỉ</h3>
              <p className="hotelDesc">
                {hotel.description}
              </p>
            </div>
            <div>
              <div className="hotelDetailsPrice">
                <h1>Điểm nổi bật của chỗ nghỉ</h1>
                <span>
                  Nằm ở {hotel.dest}, {hotel.type?.label} này có vị trí tuyệt vời
                </span>
                <h1>Thông tin về bữa sáng</h1>
                <div className="hotelAddress1">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <span>Tự chọn, bữa sáng mang đi</span>
                </div>
                <button>Đặt ngay</button>
              </div>
            </div>
          </div>
        </div>
        <div className="hotel-search-bar">
          <SearchBar setShowRooms={setShowRooms} />
          {showRooms ?
            <div className="hotel-rooms"><Table /></div> : <h3 className="mt-5 text-center">Vui lòng chọn ngày để đặt phòng</h3>}
        </div>
        {hotel.reviews?.length > 0 &&
          <div className="review-section">
            <h3 className="hotelTitle">Đánh giá của khách</h3>
            <div className="slick">
              <CardSlick reviews={hotel.reviews} />
            </div>
          </div>}
      </div>
      <Email />
      <Footer />
    </div>

  );
};

export default Hotel;
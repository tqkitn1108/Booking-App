import "./hotel.css";
import React, { useEffect } from 'react';
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import api from "../../api/AxiosConfig";
import Badges from "./badge";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Table from "./Table";
import CardSlick from "./CardSlick";

import { useParams } from "react-router-dom";
import HeaderH from "./NavbarH";
const Hotel = () => {
  const {hotelId} = useParams();
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState({});

  useEffect(() => {
    async function loadHotelData(){
      try{
        const response = await api.get(`/business/hotels/${hotelId}`);
        setHotel(response.data);
      } catch(err){
        console.log(err);
      }
    }
    loadHotelData();
  }, [])
  const rStars = (value) => {
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
  function RatingComponentH({ rating }) {
    let textToShow;
    if (rating !== undefined && rating !== null) {
      if (rating >= 9.0) {
        textToShow = "Tuyệt hảo";
      } else if (rating >= 8.0) {
        textToShow = "Rất tốt";
      } else if (rating >= 7.0) {
        textToShow = "Tốt";
      } else if (rating >= 6.0) {
        textToShow = "Dễ chịu";
      } else textToShow = "Bình thường"
    }

    return textToShow;
  }
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber)
  };


  return (

    <div className="hotel">
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
        
          <button className="bookNow">Đặt ngay!</button>
          
          <div className="cpn">
          <span className="Rating"><RatingComponentH rating={hotel.rating}></RatingComponentH></span>
          
          <button className="bookNow1"  >{hotel.rating}</button>
          </div>
          <h1 className="hotelTitle">{hotel?.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{hotel?.address}</span>
          </div>
          <span className="hotelDistance">
            Vị trí xuất sắc - Nằm ngay trên bản đồ
          </span>
          <span className="hotelPriceHighlight">
          {rStars(hotel.star)}
            Chúng tôi luôn tận tâm
          </span>
          <div className="hotelImages">
            {hotel?.photos?.map((photoSrc, i) => (
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
              <Badges />
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                {hotel?.description}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Điểm nổi bật của chỗ nghỉ</h1>
              <span>
                Nằm ở {hotel?.dest}, khách sạn này có vị trí tuyệt vời
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
        <div className="textH">
        <h3  style={{ marginRight: 31 + 'em' }}>Phòng trống</h3>
        </div>
        <div className="Hotelnavbar">
       
        <HeaderH/>
        </div>
        <div className="HotelRoom">

       <div className="HotelTable">
        
        </div>
        <Table roomTypes={hotel?.roomTypes} />
          </div>
          <div className="HotelRoom">
        <h3 style={{ marginRight: 28 + 'em' }} >Đánh giá của khách</h3>
        
        </div>
        <div className="slick">
        <CardSlick reviews = {hotel?.reviews}/>
        </div>
        </div>
    </div>
    
  );
};

export default Hotel;
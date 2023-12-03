import "./hotel.css";
import React, { useEffect } from 'react';
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Table from "./Table";
import CardReview from "./Card";
const Hotel = () => {

  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);

  const photos = [
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707778.jpg?k=56ba0babbcbbfeb3d3e911728831dcbc390ed2cb16c51d88159f82bf751d04c6&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707367.jpg?k=cbacfdeb8404af56a1a94812575d96f6b80f6740fd491d02c6fc3912a16d8757&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708745.jpg?k=1aae4678d645c63e0d90cdae8127b15f1e3232d4739bdf387a6578dc3b14bdfd&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261708693.jpg?k=ea210b4fa329fe302eab55dd9818c0571afba2abd2225ca3a36457f9afa74e94&o=&hp=1",
    },
    {
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707389.jpg?k=52156673f9eb6d5d99d3eed9386491a0465ce6f3b995f005ac71abc192dd5827&o=&hp=1",
    },
    {
     src :"https://cf.bstatic.com/xdata/images/hotel/max1280x900/261707776.jpg?k=054bb3e27c9e58d3bb1110349eb5e6e24dacd53fbb0316b9e2519b2bf3c520ae&o=&hp=1"
    }
  ];

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
    
      <div>
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
              <img src={photos[slideNumber].src} alt="" className="sliderImg" />
            </div>
            <FontAwesomeIcon
              icon={faCircleArrowRight}
              className="arrow"
              onClick={() => handleMove("r")} />
          </div>
        )}
        <div className="hotelWrapper">
          <button className="bookNow">Đặt ngay!</button>
          <h1 className="hotelTitle">Tower Street Apartments</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>Số 2 Đại Cồ Việt, quận Hai Bà Trưng, Hà Nội</span>
          </div>
          <span className="hotelDistance">
            Vị trí xuất sắc - Nằm ngay trên bản đồ
          </span>
          <span className="hotelPriceHighlight">
            Chúng tôi luôn tận tâm
          </span>
          <div className="hotelImages">
            {photos.map((photo, i) => (
              <div className="hotelImgWrapper" key={i}>
                <img
                  onClick={() => handleOpen(i)}
                  src={photo.src}
                  alt=""
                  className="hotelImg" />
              </div>
            ))}
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">Stay in the heart of City</h1>
              <p className="hotelDesc">
                <p style={{ marginBottom: 0.5 + 'em' }}>Bạn đủ điều kiện nhận giảm giá Genius tại La Passion Premium Cau Go! Để tiết kiệm tại chỗ nghỉ này, bạn chỉ cần đăng nhập.
                  Thông tin chi tiết:</p>
                <p style={{ marginLeft: 1 + 'em' }}>Giảm giá 20% cho tất cả các đêm nghỉ</p>
                <p style={{ marginLeft: 1 + 'em' }}>Áp dụng cho tất cả các loại phòng và suite</p>
                <p style={{ marginLeft: 1 + 'em' }}>Không có hạn sử dụng</p>
                <p>Để nhận giảm giá, hãy đăng nhập vào tài khoản Genius của bạn trên trang web của chúng tôi.</p>
                <p>Để biết thêm thông tin, vui lòng liên hệ với bộ phận đặt phòng của chúng tôi theo số 024 3945 1234.</p>
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Điểm nổi bật của chỗ nghỉ</h1>
              <span>
                Nằm ngay ở trung tâm Hà Nội, khách sạn này có vị trí tuyệt vời
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
        <div className="HotelRoom">
        <h3 style={{ marginRight: 41.0 + 'em' }}>Phòng trống</h3>
        </div>
          <Table />
          <div className="HotelRoom">
        <h3 style={{ marginRight: 38.0 + 'em' }} >Đánh giá của khách</h3>
        </div>
          <CardReview/>
      </div>
        
    </div>
  );
};

export default Hotel;
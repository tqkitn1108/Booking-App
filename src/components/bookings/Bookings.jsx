import React, { useContext, useEffect, useState } from 'react';
import "./bookings.css";
import api from "../../api/AxiosConfig";
import { AuthContext } from '../../context/AuthContext';
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";
import ModalBootstrap from '../modal/ModalBootstrap';
import LoadingSpinner from '../loading-spinner/LoadingSpinner';

function Bookings() {
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");
    const { user } = useContext(AuthContext);
    const [bookingInfo, setBookingInfo] = useState({});
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        try {
            const response = await api.get(`/bookings/users/${user?.userId}`);
            const data = await Promise.all(response.data.map(async (booking) => {
                const hotelRes = await api.get(`/business/hotels/${booking.hotelId}`);
                return {
                    ...booking,
                    hotelName: hotelRes.data.name
                }
            }))
            setList(data);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    const handleRateReviewClick = (id, hotelId) => {
        setBookingInfo({ id, hotelId });
        setShowReviewPopup(true);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmitReview = async () => {
        try {
            await api.post(`/hotels/${bookingInfo.hotelId}/reviews`,
                {
                    bookingId: bookingInfo.id,
                    fullName: user.userFullName,
                    rating: rating,
                    content: reviewText,
                });
            setModalMessage('Gửi đánh giá thành công!');
        } catch (err) {
            setModalMessage(err.response);
        }
        setShowModal(true);
        // Reset state and close the pop-up
        // setRating(0);
        // setReviewText("");
        // setShowReviewPopup(false);
    };

    const handleClosePopup = () => {
        setShowReviewPopup(false);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        window.location.reload();
    };
    return (
        <>
            <ModalBootstrap body={modalMessage} showModal={showModal} handleCloseModal={handleCloseModal} />
            {loading && <LoadingSpinner />}
            <Navbar />
            <div className="bookings">
                <div className="bookings-container">
                    <div className="bookings-titles">
                        <div className="bookings-ttl-text">BOOKINGS</div>
                        <div className="bookings-ttl-des">HOME {'>'} BOOKINGS</div>
                    </div>
                    <div className="bookings-content">
                        {list?.map(booking => (
                            <div className="bookings-item" key={booking.id}>
                                <div className="bks-item-type bks-fnw">{booking?.hotelName}</div>
                                <div className="bks-item-price">{`Tổng giá đặt phòng: ${booking.totalPrice.toLocaleString('vi-VN')} VND`}</div>
                                <div className="bks-item-cntn">
                                    <div><span className="bks-fnw">Check in: </span>{booking.checkInDate}</div>
                                    <div><span className="bks-fnw">Check out: </span>{booking.checkOutDate}</div>
                                    <div><span className="bks-fnw">Người lớn: </span>{booking.adults}</div>
                                    <div><span className="bks-fnw">Trẻ em: </span>{booking.children}</div>
                                </div>
                                <div className="bks-item-cntn">
                                    <div><span className="bks-fnw">Danh sách phòng: </span>{booking.rooms.map(room => room.roomNumber).join(', ')}</div>
                                    <div><span className="bks-fnw">Order ID: </span>{booking.id}</div>
                                </div>
                                <div>
                                    <span className={`status ${booking.bookingStatus}`}>{booking.bookingStatus}</span>
                                </div>
                                <div>
                                    <button className="btn-bottom">Download PDF</button>
                                    {booking.isRated ?
                                        <button className="btn-bottom">
                                            &#10004; Đã đánh giá
                                        </button> :
                                        <button className="btn-bottom"
                                            onClick={() => handleRateReviewClick(booking.id, booking.hotelId)}>
                                            Đánh giá về khách sạn
                                        </button>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {showReviewPopup && (
                <div className="review-popup-overlay">
                    <div className="review-popup">
                        <div className="close-button" onClick={handleClosePopup}>
                            <i className="fas fa-times"></i>
                        </div>
                        <div>
                            <label>Đánh giá chỗ nghỉ</label>
                            <select value={rating} onChange={handleRatingChange} className="input-field">
                                <option disabled selected> -- Điểm trên thang 10 --</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                            </select>
                        </div>
                        <div>
                            <label>Nhận xét</label>
                            <textarea
                                value={reviewText}
                                onChange={handleReviewTextChange}
                                rows="4"
                                className="input-field"
                            />
                        </div>
                        <div className="submit-button-container">
                            <button onClick={handleSubmitReview} className="submit-button">
                                Gửi đánh giá
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </>
    );
}

export default Bookings;
import React, { useState } from 'react';
import "./bookings.css";
import Navbar from "../navbar/Navbar";
import Footer from "../footer/Footer";

function Bookings() {
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState("");

    const handleRateReviewClick = () => {
        setShowReviewPopup(true);
    };

    const handleRatingChange = (event) => {
        setRating(event.target.value);
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    };

    const handleSubmitReview = () => {
        // Log the values to the console
        console.log("Rating:", rating);
        console.log("Review Text:", reviewText);

        // Reset state and close the pop-up
        setRating(0);
        setReviewText("");
        setShowReviewPopup(false);
    };

    const handleClosePopup = () => {
        setShowReviewPopup(false);
    };
    return (
        <>
            <Navbar />
            <div className="bookings">
                <div className="bookings-container">
                    <div className="bookings-titles">
                        <div className="bookings-ttl-text">BOOKINGS</div>
                        <div className="bookings-ttl-des">HOME {'>'} BOOKINGS</div>
                    </div>
                    <div className="bookings-content">
                        <div className="bookings-item">
                            <div className="bks-item-type bks-fnw">Luxury Room</div>
                            <div className="bks-item-price">300 per night</div>
                            <div className="bks-item-cntn">
                                <div><span className="bks-fnw">Check in:</span> 20-07-2022</div>
                                <div><span className="bks-fnw">Check out:</span> 26-07-2022</div>
                            </div>
                            <div className="bks-item-cntn">
                                <div><span className="bks-fnw">Amount:</span> 300</div>
                                <div><span className="bks-fnw">Order ID:</span> ORD_20235650</div>
                                <div><span className="bks-fnw">Date:</span> 20-07-2022</div>
                            </div>
                            <button className="bks-item-status">BOOKED</button>
                            <div>
                                <button className="btn-bottom">Download PDF</button>
                                <button className="btn-bottom" onClick={handleRateReviewClick}>Rate & Review</button>
                            </div>
                        </div>
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
                            <label>Rating:</label>
                            <select value={rating} onChange={handleRatingChange} className="input-field">
                                <option value="0">Select Rating</option>
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
                            <label>Review:</label>
                            <textarea
                                value={reviewText}
                                onChange={handleReviewTextChange}
                                rows="4"
                                className="input-field"
                            />
                        </div>
                        <div className="submit-button-container">
                            <button onClick={handleSubmitReview} className="submit-button">
                                Review
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
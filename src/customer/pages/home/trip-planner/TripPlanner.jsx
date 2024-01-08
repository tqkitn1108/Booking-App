import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./tripplanner.css";
import { Navigation } from 'swiper/modules';
import { destinations } from '../../../../data/destinationData';
import {
    faUmbrellaBeach,
    faMountainSun,
    faCity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from 'react';
const CustomTab = ({ label, isActive, onClick }) => (
    <div className={`choice-item ${isActive ? 'choice-item-active' : ''}`} onClick={onClick}>
        {label}
    </div>
);
const TripPlanner = () => {
    const [activeTab, setActiveTab] = useState('Beach');
    const [slidesPerView, setSlidesPerView] = useState(6);
    const handleTabSelect = (key) => {
        setActiveTab(key);
    };
    useEffect(() => {
        const updateSlidesPerView = () => {
            if (window.innerWidth <= 46.1875 * 16) {  // Chuyển đổi từ em sang px
                setSlidesPerView(4);
            } else {
                setSlidesPerView(6);
            }
        };

        window.addEventListener('resize', updateSlidesPerView);
        updateSlidesPerView();  // Đặt giá trị ban đầu khi trang được tải

        return () => {
            window.removeEventListener('resize', updateSlidesPerView);
        };
    }, []);
    return (
        <div className="trip-planner">
            <div className="trip-planner-choices">
                <CustomTab
                    label={<div>
                        <FontAwesomeIcon icon={faUmbrellaBeach} />
                        <div className="choice-item-text">Bãi biển</div>
                    </div>}
                    isActive={activeTab === 'Beach'}
                    onClick={() => handleTabSelect('Beach')}
                />
                <CustomTab
                    label={<div>
                        <FontAwesomeIcon icon={faMountainSun} />
                        <div className="choice-item-text">Thiên nhiên</div>
                    </div>}
                    isActive={activeTab === 'Outdoors'}
                    onClick={() => handleTabSelect('Outdoors')}
                />
                <CustomTab
                    label={<div>
                        <FontAwesomeIcon icon={faCity} />
                        <div className="choice-item-text">Thành phố</div>
                    </div>}
                    isActive={activeTab === 'City'}
                    onClick={() => handleTabSelect('City')}
                />
            </div>
            <div className="trip-planner-container" style={{ display: activeTab === 'Beach' ? 'block' : 'none' }}>
                <>
                    <Swiper navigation={true} modules={[Navigation]} slidesPerView={slidesPerView} spaceBetween={16}>
                        {destinations.map((destination, index) => {
                            if (destination.type === 'Beach')
                                return (<SwiperSlide key={index}>
                                    <div className="trip-planner-item">
                                        <img src={destination.image} alt="" className="trip-planner-img" />
                                        <div>
                                            <h5 className="trip-planner-titles">{destination.dest}</h5>
                                            <h5 className="trip-planner-desrcibe">Cách đây 88km</h5>
                                        </div>
                                    </div>
                                </SwiperSlide>)
                        })}
                    </Swiper>
                </>
            </div>


            <div className="trip-planner-container" style={{ display: activeTab === 'Outdoors' ? 'block' : 'none' }}>
                <>
                    <Swiper navigation={true} modules={[Navigation]} slidesPerView={6} spaceBetween={16}>
                        {destinations.map((destination, index) => {
                            if (destination.type === 'Outdoors')
                                return (<SwiperSlide key={index}>
                                    <div className="trip-planner-item">
                                        <img src={destination.image} alt="" className="trip-planner-img" />
                                        <div>
                                            <h5 className="trip-planner-titles">{destination.dest}</h5>
                                            <h5 className="trip-planner-desrcibe">Cách đây 88km</h5>
                                        </div>
                                    </div>
                                </SwiperSlide>)
                        })}
                    </Swiper>
                </>
            </div>


            <div className="trip-planner-container" style={{ display: activeTab === 'City' ? 'block' : 'none' }}>
                <>
                    <Swiper navigation={true} modules={[Navigation]} slidesPerView={6} spaceBetween={16}>
                        {destinations.map((destination, index) => {
                            if (destination.type === 'City')
                                return (<SwiperSlide key={index}>
                                    <div className="trip-planner-item">
                                        <img src={destination.image} alt="" className="trip-planner-img" />
                                        <div>
                                            <h5 className="trip-planner-titles">{destination.dest}</h5>
                                            <h5 className="trip-planner-desrcibe">Cách đây 88km</h5>
                                        </div>
                                    </div>
                                </SwiperSlide>)
                        })}
                    </Swiper>
                </>
            </div>
        </div>
    )
}

export default TripPlanner
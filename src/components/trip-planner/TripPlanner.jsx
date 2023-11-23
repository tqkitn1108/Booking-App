import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./tripplanner.css";
import { Navigation } from 'swiper/modules';
const TripPlanner = () => {
    return (
        <div className="trip-planner">
        <>
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={6} spaceBetween={15} className="mySwiper">
            <SwiperSlide>
                <div className="trip-planner-item">
                    <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688893.jpg?k=d32ef7ff94e5d02b90908214fb2476185b62339549a1bd7544612bdac51fda31&o=" alt="" className="trip-planner-img" />
                    <div>
                        <h5 className="trip-planner-titles">TP.Hải Phòng</h5>
                        <h5 className="trip-planner-desrcibe">Cách đây 88km</h5>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="trip-planner-item">
                    <img src="https://q-xx.bstatic.com/xdata/images/city/170x136/688853.jpg?k=f6427c8fccdf777e4bbc75fcd245e7c66204280181bea23350388c76c57348d1&o=" alt="" className="trip-planner-img" />
                    <div>
                        <h5 className="trip-planner-titles">Hạ Long</h5>
                        <h5 className="trip-planner-desrcibe">Cách đây 128km</h5>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="trip-planner-item">
                    <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688866.jpg?k=fc9d2cb9fe2f6d1160e10542cd2b83f5a8008401d33e8750ee3c2691cf4d4f7e&o=" alt="" className="trip-planner-img" />
                    <div>
                        <h5 className="trip-planner-titles">Đảo Cát Bà</h5>
                        <h5 className="trip-planner-desrcibe">Cách đây 129km</h5>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="trip-planner-item">
                    <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688844.jpg?k=02892d4252c5e4272ca29db5faf12104004f81d13ff9db724371de0c526e1e15&o=" alt="" className="trip-planner-img" />
                    <div>
                        <h5 className="trip-planner-titles">Thanh Hóa</h5>
                        <h5 className="trip-planner-desrcibe">Cách đây 136km</h5>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="trip-planner-item">
                    <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688879.jpg?k=82ca0089828054a1a9c46b14ea7f1625d73d42505ae58761e8bcc067f9e72475&o=" alt="" className="trip-planner-img" />
                    <div>
                        <h5 className="trip-planner-titles">Sầm Sơn</h5>
                        <h5 className="trip-planner-desrcibe">Cách đây 144km</h5>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="trip-planner-item">
                    <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=" alt="" className="trip-planner-img" />
                    <div>
                        <h5 className="trip-planner-titles">Quảng Ninh</h5>
                        <h5 className="trip-planner-desrcibe">Cách đây 177km</h5>
                    </div>
                </div>
            </SwiperSlide>
            <SwiperSlide>
                <div className="trip-planner-item">
                    <img src="https://r-xx.bstatic.com/xdata/images/city/170x136/688907.jpg?k=8a219233969467d9f7ff828918cce2a53b4db6f1da1039d27222441ffb97c409&o=" alt="" className="trip-planner-img" />
                    <div>
                        <h5 className="trip-planner-titles">Quảng Ninh</h5>
                        <h5 className="trip-planner-desrcibe">Cách đây 177km</h5>
                    </div>
                </div>
            </SwiperSlide>
        </Swiper>
        </>
        </div>
    )
}

export default TripPlanner
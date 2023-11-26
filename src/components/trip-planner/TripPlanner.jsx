import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./tripplanner.css";
import { Navigation } from 'swiper/modules';
import { destinations } from '../../data/destinationData';

const TripPlanner = () => {
    return (
        <div className="trip-planner">
            <>
                <Swiper navigation={true} modules={[Navigation]} slidesPerView={6} className="mySwiper">
                    {destinations.map((destination, index) => {
                        if (destination.type === 'Beach')
                            return (<SwiperSlide>
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
    )
}

export default TripPlanner
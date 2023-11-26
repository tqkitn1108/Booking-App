import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./explore.css";
import { Navigation } from 'swiper/modules';
import { destinations } from '../../data/destinationData';

const Explore = () => {
    return (
        <div className="explore">
            <>
                <Swiper navigation={true} modules={[Navigation]} slidesPerView={6} className="mySwiper">
                    {destinations.map((destination, index) => {
                        return (<SwiperSlide>
                            <div className="explore-item">
                                <img src={destination.image} alt="" className="explore-img" />
                                <div>
                                    <h5 className="explore-titles">{destination.dest}</h5>
                                    <h5 className="explore-desrcibe">5.605 chỗ nghỉ</h5>
                                </div>
                            </div>
                        </SwiperSlide>)
                    })}
                </Swiper>
            </>
        </div>
    )
}

export default Explore
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./property.css";
import { Navigation } from 'swiper/modules';
import { propertyTypes } from '../../data/propertyTypeData';
const PropertyType = () => {
    return (
        <div className="property-type">
        <>
            <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} spaceBetween={16}>
            {propertyTypes.map((propertyType, index) => {
                        return (<SwiperSlide>
                            <div className="ptype-item">
                                <img src={propertyType.image} alt="" className="ptype-img" />
                                <div>
                                    <h5 className="ptype-titles">{propertyType.type}</h5>
                                    <h5 className="ptype-add">Không còn chỗ trống vào ngày bạn chọn</h5>
                                </div>
                            </div>
                        </SwiperSlide>)
                    })}
            </Swiper>
        </>
        </div>
    )
}

export default PropertyType
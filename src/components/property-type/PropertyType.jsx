import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./property.css";
import { Navigation } from 'swiper/modules';
const PropertyType = () => {
    return (
        <div className="property-type">
        <>
            <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} className="mySwiper">
                <SwiperSlide>
                    <div className="ptype-item">
                        <img src="https://r-xx.bstatic.com/xdata/images/xphoto/263x210/57584488.jpeg?k=d8d4706fc72ee789d870eb6b05c0e546fd4ad85d72a3af3e30fb80ca72f0ba57&o=" alt="" className="ptype-img" />
                        <div>
                            <h5 className="ptype-titles">Khách sạn</h5>
                            <h5 className="ptype-add">Không còn chỗ trống vào ngày bạn chọn</h5>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="ptype-item">
                        <img src="https://r-xx.bstatic.com/xdata/images/hotel/263x210/119467716.jpeg?k=f3c2c6271ab71513e044e48dfde378fcd6bb80cb893e39b9b78b33a60c0131c9&o=" alt="" className="ptype-img" />
                        <div>
                            <h5 className="ptype-titles">Căn hộ</h5>
                            <h5 className="ptype-add">Không còn chỗ trống vào ngày bạn chọn</h5>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="ptype-item">
                        <img src="https://q-xx.bstatic.com/xdata/images/xphoto/263x210/45450084.jpeg?k=f8c2954e867a1dd4b479909c49528531dcfb676d8fbc0d60f51d7b51bb32d1d9&o=" alt="" className="ptype-img" />
                        <div>
                            <h5 className="ptype-titles">Resort</h5>
                            <h5 className="ptype-add">Không còn chỗ trống vào ngày bạn chọn</h5>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="ptype-item">
                        <img src="https://q-xx.bstatic.com/xdata/images/hotel/263x210/100235855.jpeg?k=5b6e6cff16cfd290e953768d63ee15f633b56348238a705c45759aa3a81ba82b&o=" alt="" className="ptype-img" />
                        <div>
                            <h5 className="ptype-titles">Biệt thự</h5>
                            <h5 className="ptype-add">Không còn chỗ trống vào ngày bạn chọn</h5>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="ptype-item">
                        <img src="https://hoangsonpeacehotel.com.vn/FileUpload/Images/0080hdr3_4.jpg" alt="" className="ptype-img" />
                        <div>
                            <h5 className="ptype-titles">Nhà gỗ</h5>
                            <h5 className="ptype-add">Không còn chỗ trống vào ngày bạn chọn</h5>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
        </div>
    )
}

export default PropertyType
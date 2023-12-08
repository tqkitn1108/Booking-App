import "./explore.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { destinations } from '../../data/destinationData';
import { countByDest } from '../../api/ApiFunctions';

const Explore = () => {

    async function destList() {
        const destParams = destinations.reduce((list, destination) => list + `,${destination.dest}`, "");
        try{
            const response = await countByDest(destParams.slice(1).replaceAll(" ", "%20"));
            console.log(response.data);
        }catch(e){
            console.error(e);
        }
    }


    return (
        <div className="explore" onClick={() => destList()}>
            <>
                <Swiper navigation={true} modules={[Navigation]} slidesPerView={6} spaceBetween={16}>
                    {destinations.map((destination, i) => {
                        return (<SwiperSlide key={i}>
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
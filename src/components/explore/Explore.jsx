import "./explore.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { destinations } from '../../data/destinationData';
import { countByDest } from '../../api/ApiFunctions';
import { useEffect, useState } from "react";

const Explore = () => {

    const [numProperties, setNumProperties] = useState({});

    useEffect(() => {
        async function countExploreProperties() {
            const destParams = destinations.reduce((list, destination) => list + `,${destination.dest}`, "");
            try {
                const response = await countByDest(destParams.slice(1).replaceAll(" ", "%20"));
                setNumProperties(response.data)
            } catch (e) {
                console.error(e);
            }
        }
        countExploreProperties()
    }, []);

    return (
        <div className="explore">
            <>
                <Swiper navigation={true} modules={[Navigation]} slidesPerView={6} spaceBetween={16}>
                    {destinations.map((destination, i) => {
                        return (<SwiperSlide key={i}>
                            <div className="explore-item">
                                <img src={destination.image} alt="" className="explore-img" />
                                <div>
                                    <h5 className="explore-titles">{destination.dest}</h5>
                                    <h5 className="explore-desrcibe">{numProperties[destination.dest]} chỗ nghỉ</h5>
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
import "./explore.css";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import { destinations } from '../../../../data/destinationData';
import { countByDest } from '../../../../api/ApiFunctions';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Explore = () => {
    const [slidesPerView, setSlidesPerView] = useState(6);
    const [numProperties, setNumProperties] = useState({});
    const navigate = useNavigate();
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
    useEffect(() => {
        async function countExploreProperties() {
            const destParams = destinations.reduce((list, destination) => list + `,${destination.name}`, "");
            try {
                const response = await countByDest(destParams.slice(1).replaceAll(" ", "%20"));
                setNumProperties(response.data)
            } catch (e) {
                console.error(e);
            }
        }
        countExploreProperties()
    }, []);

    function handleSearch(dest) {
        const location = dest.replaceAll(' ', '%20');
        navigate(`/hotels/search?location=${location}&page=0&size=3`);
    }

    return (
        <div className="explore">
            <>
                <Swiper navigation={true} modules={[Navigation]} slidesPerView={slidesPerView} spaceBetween={16}>
                    {destinations.map((destination, i) => {
                        return (<SwiperSlide key={i}>
                            <div className="explore-item" onClick={() => handleSearch(destination.name)}>
                                <img src={destination.image} alt="" className="explore-img" />
                                <div>
                                    <h5 className="explore-titles">{destination.name}</h5>
                                    <h5 className="explore-desrcibe">{numProperties[destination.name]} chỗ nghỉ</h5>
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
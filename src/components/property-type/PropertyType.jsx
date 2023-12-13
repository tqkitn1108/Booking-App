import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import "./property.css";
import { Navigation } from 'swiper/modules';
import { propertyTypes } from '../../data/propertyTypeData';
import { useEffect, useState } from 'react';
import { countByType } from '../../api/ApiFunctions';

const PropertyType = () => {
    const [numProperties, setNumProperties] = useState({});

    useEffect(() => {
        async function countProperties() {
            const destParams = propertyTypes.reduce((list, propertyType) => list + `,${propertyType.type}`, "");
            try {
                const response = await countByType(destParams.slice(1).replaceAll(" ", "%20"));
                setNumProperties(response.data)
            } catch (e) {
                console.error(e);
            }
        }
        countProperties()
    }, []);

    return (
        <div className="property-type">
            <>
                <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} spaceBetween={16}>
                    {propertyTypes.map((propertyType, i) => {
                        return (<SwiperSlide key={i}>
                            <div className="ptype-item">
                                <img src={propertyType.image} alt="" className="ptype-img" />
                                <div>
                                    <h5 className="ptype-titles">{propertyType.type}</h5>
                                    <h5 className="ptype-add">{numProperties[propertyType.type]} chỗ nghỉ</h5>
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
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';

import './FeaturedHome.css'; 

const FeaturedProperties = () => {
  const properties = [
    {
      imgSrc:
        'https://cf.bstatic.com/xdata/images/hotel/square600/13125860.webp?k=e148feeb802ac3d28d1391dad9e4cf1e12d9231f897d0b53ca067bde8a9d3355&o=&s=1',
      name: 'Aparthotel Stare Miasto',
      city: 'Madrid',
      price: 'Starting from $120',
      rating: { value: '8.9', label: 'Excellent' },
    },
    // Thêm các đối tượng khác tương tự
    {
        imgSrc:
        'https://cf.bstatic.com/xdata/images/hotel/max1280x900/215955381.jpg?k=ff739d1d9e0c8e233f78ee3ced82743ef0355e925df8db7135d83b55a00ca07a&o=&hp=1',
        name: 'Comfort Suites Airport',
        city: 'Austin',
        price: 'Starting from $140',
        rating: { value: '9.3', label: 'Exceptional' },
      },
      {
        imgSrc:
        'https://cf2.bstatic.com/xdata/images/hotel/square600/95058973.webp?k=c4092495705eab3fad626e8e1a43b1daf7c623e4ea41daf26a201b4417a71709&o=',
        name: 'Four Seasons Hotel',
        city: 'Lisbon',
        price: 'Starting from $99',
        rating: { value: '8.8', label: 'Excellent' },
      },
      {
        imgSrc:
        'https://cf2.bstatic.com/xdata/images/hotel/square600/87375132.webp?k=a3eff4ea2475f3a4de01f017463acd719bddada5e63f87f6c0952f8590498865&o=',
        name: 'Hilton Garden Inn',
        city: 'Berlin',
        price: 'Starting from $105',
        rating: { value: '8.9', label: 'Excellent' },
      },
      {
        imgSrc:
        'https://cf2.bstatic.com/xdata/images/hotel/square600/87375132.webp?k=a3eff4ea2475f3a4de01f017463acd719bddada5e63f87f6c0952f8590498865&o=',
        name: 'Hilton Garden Inn',
        city: 'Berlin',
        price: 'Starting from $105',
        rating: { value: '8.9', label: 'Excellent' },
      },
  ];

  return (
    <div className="fp">
      <>
        <Swiper navigation={true} modules={[Navigation]} slidesPerView={4} spaceBetween={16}>
          {properties.map((property, index) => (
            <SwiperSlide key={index}>
              <div className="fpItem">
                <img src={property.imgSrc} alt="" className="fpImg" />
                <div className="fpTitles">
                  <div className="fpDes">
                    <span className="fpName">{property.name}</span>
                    <span className="fpCity">{property.city}</span>
                    <div className="fpRating">
                      <button>{property.rating.value}</button>
                      <span>{property.rating.label}</span>
                    </div>
                  </div>
                  <span className="fpPrice">{property.price}</span>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default FeaturedProperties;

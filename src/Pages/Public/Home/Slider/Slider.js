import React from 'react';
import './Slider.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import slideImg from '../../../../Assets/Images/temp/slideImg.png';


const Slider = ({slideInfo}) => {
    return (
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="carosel"
      >
        {slideInfo.length > 0 ? (
          slideInfo.map((info) => {
            return (
              <SwiperSlide key={info._id}>
                <img
                  alt=""
                  src={`${process.env.REACT_APP_SERVER_HOST_URL}/${info}`}
                />
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide className='no-img'>
            <p />
          </SwiperSlide>
        )}

        {/* <SwiperSlide>
          <img alt="img" src={slideImg} />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="img" src={slideImg} />
        </SwiperSlide>
        <SwiperSlide>
          <img alt="img" src={slideImg} />
        </SwiperSlide> */}
      </Swiper>
    );
};

export default Slider;
import React from "react";
import "./PaymentMethod.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";

// import "swiper/css";

// import "./styles.css";


import bkash from "../../../../Assets/Images/Logo/Mobile_bank_logo/bkash-removebg-preview.png";
import nagad from "../../../../Assets/Images/Logo/Mobile_bank_logo/download__3_-removebg-preview.png";
import dachbangla from "../../../../Assets/Images/Logo/Mobile_bank_logo/Dutch-Bangla-Bank-logo-JAN-17-2201171056-2203070612-removebg-preview (5).png";
import roket from "../../../../Assets/Images/Logo/Mobile_bank_logo/roket-removebg-preview.png";
import tap from "../../../../Assets/Images/Logo/Mobile_bank_logo/tap-removebg-preview.png";
import upay from "../../../../Assets/Images/Logo/Mobile_bank_logo/Untitled_2527_x_2527_px_3-removebg-preview.png";

const PaymentMethod = () => {
  return (
    <section className="payment py-5">
      <div>
        <h4 >PAYMENT METHODS</h4>
        <h3 className="pb-3 ">Accepted Payment Method</h3>
      </div>
      <Swiper
        watchSlidesProgress={true}
        slidesPerView={4}
        rewind={true}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="item">
            <img src={bkash} alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img src={nagad} alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img src={upay} alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img src={tap} alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img src={roket} alt="img" />
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="item">
            <img src={dachbangla} alt="img" />
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
    // <section className='payment py-5'>
    //     <div className='container'>
    //         <div>
    //             <h4 >PAYMENT METHODS</h4>
    //             <h3 className='pb-3'>Accepted Payment Method</h3>
    //         </div>
    //         <div>
    //             <OwlCarousel className="owl-theme"
    //              loop margin={10}
    //              items={4}
    //             //  loop={true}
    //              mouseDrag={true}
    //              touchDrag={true}
    //              pullDrag={true}
    //              dots={false}
    //              autoplay={true}
    //              autoplayTimeout="2000"
    //              autoplayHoverPause={true}
    //              nav={true}
    //             //  responsive="2000"
    //             >
    //                 <div className="item">
    //                     <img src={bkash} alt='img' />
    //                 </div>
    //                 <div className="item">
    //                     <img src={nagad} alt='img' />
    //                 </div>
    //                 <div className="item">
    //                     <img src={upay} alt='img' />
    //                 </div>
    //                 <div className="item">
    //                     <img src={tap} alt='img' />
    //                 </div>
    //                 <div className="item">
    //                     <img src={roket} alt='img' />
    //                 </div>
    //                 <div className="item">
    //                     <img src={dachbangla} alt='img' />
    //                 </div>
    //             </OwlCarousel>
    //         </div>
    //     </div>
    // </section>
  );
};

export default PaymentMethod;

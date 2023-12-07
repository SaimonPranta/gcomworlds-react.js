import React from "react";
import "./AdminSlider.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; 
import { AiFillDelete } from "react-icons/ai";
import AddSliderModel from "../../Models/AddSliderModel/AddSliderModel";
import { addModel } from "../../Hooks/handleModel";
import failed from "../Toastes/failed";
import sucess from "../Toastes/sucess";
import { useDispatch } from "react-redux";
import { addConfig } from "../../Store/ConfigSlice/ConfigSlice";

const AdminSlider = ({ imgArray }) => {
  const dispatch = useDispatch()

  const handleDelte = (imgName) => {
    if (!imgName) {
      return failed("Something is wrong, please try agian letter")
    }
    

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/delete_img`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ img: imgName }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          dispatch(addConfig(data.data));
          sucess("Slider Image deleted sucessfull");
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="admin-carosel"
      >
        {imgArray?.length > 0 ? (
          imgArray?.map((img, i) => {
            return (
              <SwiperSlide key={i}>
                <img alt="" src={`${process.env.REACT_APP_SERVER_HOST_URL}/${img}`} />
                <button
                  onClick={() =>
                    addModel("add-slider-model", "active-add-slider-model")
                  }
                >
                  Add
                </button>
                <button className="delete" onClick={() => handleDelte(img)}>
                  <AiFillDelete />
                </button>
              </SwiperSlide>
            );
          })
        ) : (
          <SwiperSlide>
            <img
              alt="img"
              src={`https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1200px-No-Image-Placeholder.svg.png`}
            />
            <button
              onClick={() =>
                addModel("add-slider-model", "active-add-slider-model")
              }
            >
              Add
            </button>
          </SwiperSlide>
        )}
      </Swiper>
      <AddSliderModel />
    </>
  );
};

export default AdminSlider;

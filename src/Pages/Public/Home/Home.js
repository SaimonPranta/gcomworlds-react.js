import React, { useEffect, useState } from "react";
import "./Home.css";
import Slider from "../../Public/Home/Slider/Slider";

import FlashSaleCart from "../../../Shades/Carts/FlashSaleCart/FlashSaleCart";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import ProductCart from "../../../Shades/Carts/ProductCart/ProductCart";
import Service from "../../../Shades/Carts/Service/Service";
import { useDispatch, useSelector } from "react-redux";
import { addProducts } from "../../../Store/ProductSlice/ProductSlice";
import { addService } from "../../../Store/ServiceSlice/ServiceSlice";
import { Link, NavLink } from "react-router-dom";
import CartSkeleton from "../../../Shades/CartSkeleton/CartSkeleton";
import { categoriesArray } from "../../../Layouts/PublicLayoutWithSideNav/Categories/helper/constants";
import { addQuery } from "../../../Store/Query/QuerySlice";

const Home = () => {
  const [flashSales, setFlashSales] = useState({});
  const [productPage, setProductPage] = useState(1);
  const [disableProductPage, setDisableProductPage] = useState(true);
  const [servicePage, setServicePage] = useState(1);
  const [disableServicePage, setDisableServicePage] = useState(true);
  const [condition, setCondition] = useState({
    productLoading: false,
  });

  const dispatch = useDispatch();
  const config = useSelector((state) => state.config.data);
  const products = useSelector((state) => state.products.data);
  const services = useSelector((state) => state.services.data);

  const [time, setTime] = useState({
    hour: Number(24 - new Date().getHours()),
    min: Number(60 - new Date().getMinutes()),
    sec: Number(60 - new Date().getSeconds()),
  });

  let intervalFunction = null;

  useEffect(() => {

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public_product/flash_sales`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setFlashSales(data.data);
        }
      });
  }, []);
  useEffect(() => {
    setCondition((state) => {
      return {
        ...state,
        productLoading: true,
      };
    });
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/public_product/get_product_by_pagination/${productPage}`
    )
      .then((res) => res.json())
      .then((data) => {
        setCondition((state) => {
          return {
            ...state,
            productLoading: false,
          };
        });
        if (data.data) {
          setDisableProductPage(data.disable);
          dispatch(addProducts([...products, ...data.data]));
        }
      });
  }, [productPage]);

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/public_service/get_service_by_pagination/${servicePage}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setDisableServicePage(data.disable);
          dispatch(addService(data.data));
        }
      });
  }, [servicePage]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      Number(document.documentElement.offsetHeight - 1)
    ) {
      // fetchData();
      console.log("call the Fetch data ===========>>>");
      setProductPage((state) => state + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   handelTimer();
  //   return () => clearInterval(intervalFunction);
  // }, []);

  // const handelTimer = () => {
  //   intervalFunction = setInterval(() => {
  //     const newTime = {
  //       hour:
  //         Number(24 - new Date().getHours()).toString().length > 1
  //           ? Number(24 - new Date().getHours())
  //           : "0" + Number(24 - new Date().getHours()),
  //       min:
  //         Number(60 - new Date().getMinutes()).toString().length > 1
  //           ? Number(60 - new Date().getMinutes())
  //           : "0" + Number(60 - new Date().getMinutes()),
  //       sec:
  //         Number(60 - new Date().getSeconds()).toString().length > 1
  //           ? Number(60 - new Date().getSeconds())
  //           : "0" + Number(60 - new Date().getSeconds()),
  //     };
  //     setTime(newTime);
  //   }, 1000);
  // };

  return (
    <section>
      <section className="hero-section light-shadow">
        <div className="inner-hero">
          <Slider
            slideInfo={config?.sliderImg?.length > 0 ? config.sliderImg : []}
          />
        </div>
        <div className="right-section">
          <img
            src={
              config?.heroImg?.imgOne
                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${config?.heroImg?.imgOne}`
                : ""
            }
            alt=""
          />
          <img
            src={
              config?.heroImg?.imgTwo
                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${config?.heroImg?.imgTwo}`
                : ""
            }
            alt=""
          />
          <img
            src={
              config?.heroImg?.imgThree
                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${config?.heroImg?.imgThree}`
                : ""
            }
            alt=""
          />
        </div>
      </section>
      <section className="categories py-5">
        <Swiper
          slidesPerView={5}
          spaceBetween={10}
          fade={true}
          grabCursor={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          breakpoints={{
            0: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            350: {
              slidesPerView: 2,
            },
            700: {
              slidesPerView: 4,
            },
            1200: {
              slidesPerView: 7,
              spaceBetween: 10,
            },
          }}
          className="inner-categories"
        >
          {[...categoriesArray, ...categoriesArray].map((categorie) => {
            return (
              <SwiperSlide key={categorie.value}>
                <Link to={`/${categorie.value}`}>
                  <img src={categorie.img} alt="" />
                  <p>{categorie.label}</p>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <section className="flsh-sale">
        <div className="product-section-title"></div>
        <div className="product-section-title">
          <span className="custom-icon" /> <h3>Flash Sale</h3>
        </div>
        <div className="inner-product-collection light-shadow">
          <div className="count-section">
            <p className="on-sale-now">On Sale Now</p>
            <p className="ending">Ending in</p>
            <div className="count-box">
              <p>{time.hour}</p>
              <p>{time.min}</p>
              <p>{time.sec}</p>
            </div>
          </div>
          <div className="product-collection">
            <Swiper
              slidesPerView={5}
              spaceBetween={10}
              fade={true}
              grabCursor={true}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              breakpoints={{
                0: {
                  slidesPerView: 2,
                  spaceBetween: 5,
                },
                350: {
                  slidesPerView: 2,
                },
                700: {
                  slidesPerView: 4,
                },
                1200: {
                  slidesPerView: 5,
                  spaceBetween: 10,
                },
              }}
              className="mySwiper"
            >
              {flashSales?.length > 0
                ? flashSales.map((pd) => {
                    return (
                      <SwiperSlide key={pd._id}>
                        <FlashSaleCart product={pd} />
                      </SwiperSlide>
                    );
                  })
                : new Array(8).fill().map((v, i) => {
                    return (
                      <SwiperSlide key={i}>
                        <CartSkeleton btn={false} key={i} />
                      </SwiperSlide>
                    );
                  })}
            </Swiper>
          </div>
        </div>
      </section>

      <section className="my-5 service-colloction ">
        <div className="product-section-title mb-4">
          <span className="custom-icon" /> <h3>services</h3>
        </div>
        <div className="inner-service-colloction light-shadow">
          {services.length > 0
            ? services.map((service) => {
                return <Service product={service} key={service._id} />;
              })
            : new Array(8).fill().map((v, i) => {
                return <CartSkeleton btn={false} key={i} />;
              })}
        </div>
        <div className="d-flex justify-content-center pagination-container light-shadow">
          <ul className="pagination  m-0">
            <li
              className={servicePage <= 1 ? "page-item disabled" : "page-item"}
              onClick={() => {
                servicePage > 1 && setServicePage((pre) => pre - 1);
              }}
            >
              <Link className="page-link">Previous</Link>
            </li>
            <li
              className={servicePage <= 1 ? "page-item disabled" : "page-item"}
              onClick={() => {
                servicePage > 1 && setServicePage((pre) => pre - 1);
              }}
            >
              <Link className="page-link">{servicePage - 1}</Link>
            </li>
            <li className="page-item active" aria-current="page">
              <Link className="page-link">{servicePage}</Link>
            </li>
            <li
              className={
                disableServicePage ? "page-item disabled" : "page-item"
              }
              onClick={() => {
                !disableServicePage && setServicePage((pre) => pre + 1);
              }}
            >
              <Link className="page-link">{servicePage + 1}</Link>
            </li>
            <li
              className={
                disableServicePage ? "page-item disabled" : "page-item"
              }
              onClick={() => {
                !disableServicePage && setServicePage((pre) => pre + 1);
              }}
            >
              <Link className="page-link">Next</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="my-5 product-collection">
        <div className="product-section-title">
          <span className="custom-icon" /> <h3>Products</h3>
        </div>
        <div className="inner-product-collection light-shadow">
          {products?.length > 0 &&
            products.map((product) => {
              return <ProductCart product={product} key={product._id} />;
            })}
          {condition.productLoading &&
            new Array(8).fill().map((v, i) => {
              return <CartSkeleton btn={true} key={i} />;
            })}
        </div>
      </section>

      {/* </section> */}
    </section>
  );
};

export default Home;

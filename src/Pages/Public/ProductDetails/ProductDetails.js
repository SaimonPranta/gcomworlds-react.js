import React, { useRef } from "react";
import "./ProductDetails.scss";
import { AiFillStar } from "react-icons/ai";
import { RiStarHalfFill } from "react-icons/ri";
import { TbCurrencyTaka, TbListDetails } from "react-icons/tb";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { BsInfoCircleFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../Store/LoadingSlice/LoadingSlice";
import { handleAddToCart, handleRemvoveToCart as handleRemoveToCart } from "../../../Functions/cart";
import { addCart, removeCart } from "../../../Store/CartSlice/CartSlice";
import CartSkeleton from "../../../Shades/CartSkeleton/CartSkeleton";
import ProductCart from "../../../Shades/Carts/ProductCart/ProductCart";

const ProductDetails = () => {
  const [productDetails, setProductDetails] = useState({});
  const [starArray, setStartArray] = useState([]);
  const [halfStarArray, setHalfStartArray] = useState([]);
  const [productsArray, setProductsArray] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useDispatch();
  const query = useSelector((state) => state.query.data); 


  const { id } = useParams();
  const scrollRef = useRef();
  
  useEffect(() => {
    if (id) {
      dispatch(setLoading(true));
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/public_product/get_product/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setLoading(false));
          if (data.data) {
            if (JSON.parse(localStorage.getItem("cartArray"))) {
              const cartArray = JSON.parse(localStorage.getItem("cartArray"));
              const newCartArray = cartArray.find((pd) => pd.id === id);
              if (newCartArray?.quantity) {
                data.data["quantity"] = newCartArray?.quantity;
              }
            }

            setProductDetails(data.data);
          }
        });
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/public_service/get_service/${id}`
      )
        .then((res) => res.json())
        .then((data) => {
          dispatch(setLoading(false));
          if (data.data) {
            if (JSON.parse(localStorage.getItem("cartArray"))) {
              const cartArray = JSON.parse(localStorage.getItem("cartArray"));
              const newCartArray = cartArray.find((pd) => pd.id === id);
              if (newCartArray?.quantity) {
                data.data["quantity"] = newCartArray?.quantity;
              }
            }
            setProductDetails(data.data);
          }
        });
    }
  }, [id]);
  useEffect(() => {
    if (productDetails?._id) {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/public_product/get_product_by_category`,
        {
          method: "POST",
          headers: { "content-type": "application/json; charset=UTF-8" },
          body: JSON.stringify({ categoryName: productDetails?.category }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setProductsArray(data.data);
          }
        });
    }
  }, [productDetails]);

  useEffect(() => {
    if (productDetails?._id) {
      const array = [];
      const emptyArray = [];
      for (let i = 1; i <= productDetails.rating; i++) {
        array.push(i);
        setStartArray(array);
      }
      for (let i = 1; i <= 5 - productDetails.rating; i++) {
        emptyArray.push(i);
        setHalfStartArray(emptyArray);
      }
    }
  }, [productDetails]);
  const handleAddToCartBtn = (id, query) => {
    handleAddToCart(id, query);
    dispatch(addCart());
    const info = { ...productDetails };
    if (info.quantity) {
      info.quantity = info.quantity + 1;
    } else {
      info["quantity"] = 1;
    }
    setProductDetails(info);
  };
  const handleMinusCart = (id) => {
    if (productDetails?.quantity > 0) {
      handleRemoveToCart(id);
      dispatch(removeCart());
    }
    const info = { ...productDetails };
    if (info.quantity) {
      info.quantity = info.quantity - 1;
    } else {
      info["quantity"] = 0;
    }
    setProductDetails(info);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [id]);
  return (
    <section className="details-body  container-lg mt-2">
      <div className="product-heading">
        <p>Home > Product Details > {productDetails?.title}</p>
      </div>
      <div className="product-details-warper ">
        {productDetails?.img && (
          <div className="product-img ">
            <img
              src={`${process.env.REACT_APP_SERVER_HOST_URL}/${productDetails?.img[imageIndex]}`}
              alt=""
              ref={scrollRef}
            />
            <div className="all-image-list">
              {[...productDetails?.img].map((img, index) => {
                return (
                  <img
                    className={index === imageIndex ? "active" : ""}
                    onClick={() => setImageIndex(index)}
                    src={`${process.env.REACT_APP_SERVER_HOST_URL}/${img}`}
                    alt=""
                  />
                );
              })}
            </div>
          </div>
        )}

        <div>
          <h4 className="title">{productDetails?.title}</h4>
          <div className="d-flex align-items-center pb-2">
            <div className="rating flex me-2">
              {starArray &&
                starArray.map((count) => {
                  return <AiFillStar key={count} />;
                })}
              {halfStarArray &&
                halfStarArray.map((count) => {
                  return <RiStarHalfFill key={count} />;
                })}
            </div>
            <span className="start-rating">{starArray.length} Star Rating</span>
          </div>
          <div className="price-warper pt-3">
            <p className="price d-flex align-items-center number">
              <TbCurrencyTaka />
              {Math.floor(
                productDetails.price -
                  productDetails.price * (productDetails.discount / 100)
              )}
            </p>

            <div className="old-price-warper d-flex align-items-center">
              <p className="d-flex align-items-center number">
                <TbCurrencyTaka />
                {productDetails.price}
              </p>
              <span>-{productDetails.discount}%</span>
            </div>
          </div>
          <div className="quantity d-flex align-items-center mt-3">
            <p>Quantity</p>
            <div className="d-flex align-items-center">
              <span onClick={() => handleMinusCart(productDetails._id)}>
                <FaMinus />
              </span>
              <span className="count">
                {productDetails?.quantity ? productDetails?.quantity : 0}
              </span>
              <span
                onClick={() => handleAddToCartBtn(productDetails._id, query)}
              >
                <FaPlus />
              </span>
            </div>
          </div>
          <div
            className="btn-group mt-3 d-grid  d-md-flex"
            role="group"
            aria-label="Basic mixed styles example"
          >
            <Link
              type="button"
              className="btn btn-success my-2 my-md-0 me-md-2 me-md-3"
              to="/buy_now"
              style={{ color: "#ffffff", textDecoration: "none" }}
            >
              Buy Now
            </Link>
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => {
                handleAddToCartBtn(productDetails._id, query);
              }}
            >
              Add To Cart
            </button>
          </div>
        </div>
      </div>
      <div>
        <div className="product-full-details">
          <h5>
            <TbListDetails /> Product details of {productDetails?.title}
          </h5>
          <div>
            <ul>
              {productDetails?.detailsArray &&
                productDetails.detailsArray.map((info) => {
                  return (
                    <li key={info._id}>
                      <BsInfoCircleFill /> {info.property}: {info.value}
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </div>
      <div className="related-products">
        <div>
          <h5 className="title">Related Products</h5>
        </div>
        <div className="product-container py-3">
          {productsArray?.length > 0
            ? productsArray.map((pd) => {
                return <ProductCart product={pd} key={pd._id} />;
              })
            : new Array(8).fill().map((v, i) => {
                return <CartSkeleton btn={true} key={i} />;
              })}
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

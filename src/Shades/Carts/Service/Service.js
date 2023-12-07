import React from "react";
import "./Service.css";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link } from "react-router-dom";

const Service = ({ product }) => {
  const [starArray, setStartArray] = useState([]);
  const [halfStarArray, setHalfStartArray] = useState([]);

  useEffect(() => {
    const array = [];
    const emptyArray = [];
    for (let i = 1; i <= product.rating; i++) {
      array.push(i);
      setStartArray(array);
    }
    for (let i = 1; i <= 5 - product.rating; i++) {
      emptyArray.push(i);
      setHalfStartArray(emptyArray);
    }
  }, []);

  return (
    <div className="service-cart">
      <div className="discount-parcent">
        <p>{product.discount}%</p>
      </div>
      <Link to={`/product_details/${product._id}`}>
        <div className="card-img">
          <img
            src={
              product.img
                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${product.img[0]}`
                : ""
            }
            alt=""
          />
        </div>
        <div className="porduct-details">
          <h6>{product.title}</h6>
          <p className="price">
            <TbCurrencyTaka />

            {Math.floor(
              product.price - product.price * (product.discount / 100)
            )}
          </p>
          <div className="old-price">
            <p>
              <TbCurrencyTaka />
              {Math.floor(product.price)}
            </p>
          </div>

          <div>
            {starArray.map((ele) => {
              return <AiFillStar key={ele} />;
            })}
            {halfStarArray.map((ele) => {
              return <AiOutlineStar key={ele} />;
            })}
          </div>
          <div
            className="btn-group mt-md-3 d-grid  d-md-flex"
            role="group"
            aria-label="Basic mixed styles example"
          ></div>
        </div>
      </Link>
    </div>
  );
};

export default Service;

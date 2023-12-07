import React, { useEffect, useState } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import {AiFillStar} from "react-icons/ai"
import { RiStarHalfFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import textCollaps from "../../../Functions/textCollaps";


const SearchViewProductCart = ({ product }) => {
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
    <div className="innter-container" key={product._id}>
      <Link to={`/product_details/${product._id}`}>
        <img
          src={
            product.img
              ? `${process.env.REACT_APP_SERVER_HOST_URL}/${product.img}`
              : ""
          }
          alt=""
        />
        <div className="pd-info">
          <h6>{textCollaps(product.title)}</h6>

          <p className="price">
            <TbCurrencyTaka />
            {Math.floor(
              product.price - product.price * (product.discount / 100)
            )}
          </p>

          <div>
            {starArray.map((ele) => {
              return <AiFillStar />;
            })}
            {halfStarArray.map((ele) => {
              return <RiStarHalfFill />;
            })}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SearchViewProductCart;

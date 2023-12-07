import React from "react"; 
import "./SelectProduct.css";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react"; 
import { TbCurrencyTaka } from "react-icons/tb";

const SelectProduct = ({ product }) => {
  const [starArray, setStartArray] = useState([]);
  const [halfStarArray, setHalfStartArray] = useState([]);


  return (
    <div className="select-packgae">
      <div className="card-img">
        <img
          src={product.img ? `${process.env.REACT_APP_SERVER_HOST_URL}/${product.img}` : ""}
          alt="img"
        />
      </div>
      <div className="porduct-details">
        <h6>{product.title}</h6>
        <div className="price">
          <p>
            <TbCurrencyTaka />
            {Number(product.price) -
              Number(Number(product.price) * (Number(product.discount) / 100))}
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
    </div>
  );
};

export default SelectProduct;

import React from "react";
import "./UserProductCart.css";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb";
import { Link, NavLink } from "react-router-dom";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BsCart3 } from "react-icons/bs";
import { handleAddToCart } from "../../../Functions/cart.js";
import { useDispatch, useSelector } from "react-redux";
import { addCart } from "../../../Store/CartSlice/CartSlice";

const UserProductCart = ({ product }) => {
  const [starArray, setStartArray] = useState([]);
  const [halfStarArray, setHalfStartArray] = useState([]);
  const query = useSelector((state) => state.query.data); 
  const dispatch = useDispatch();
console.log(product);
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
    <div className="product-cart">
      <div className="discount-parcent">
        <p>{product.discountForUser}%</p>
      </div>
      <Link to={`/product_details/${product._id}`}>
        <div className="card-img">
          <img
            src={
              product.img
                ? `${process.env.REACT_APP_SERVER_HOST_URL}/${product.img}`
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
              product.price - product.price * (product.discountForUser / 100)
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
      <div className="product-btn">
        <NavLink to="/buy_now">
          <BsCart3 />
          Buy Now
        </NavLink>

        <button
          className="add-to-tart"
          onClick={() => {
            handleAddToCart(product._id, query);
            dispatch(addCart());
          }}
        >
          <MdOutlineAddShoppingCart />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default UserProductCart;

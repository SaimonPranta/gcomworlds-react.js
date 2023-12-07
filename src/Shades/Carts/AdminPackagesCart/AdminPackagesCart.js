import React from "react";
import "./AdminPackagesCart.css";
import { AiFillStar, AiFillDelete } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import { useEffect } from "react";
import { TbCurrencyTaka } from "react-icons/tb"; 
import { getCookie } from "../../../Hooks/cookies";

const AdminPackagesCart = ({ product }) => {
  const [starArray, setStartArray] = useState([]);
  const [halfStarArray, setHalfStartArray] = useState([]);
  const [wating, setWating] = useState(false);

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

  const handleDeleteProduct = (productID) => {
    if (wating) {
      return true;
    }
    setWating(true);
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/packages/delete_package/${productID}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWating(false);
        if (data.data) {
          document.getElementById(productID).style.display = "none";
        }
      });
  };

  return (
    <div className="admin-product-cart" id={product._id}>
      <div className="discount-parcent">
        <p>{product.discount}%</p>
      </div>

      <div className="card-img">
        <img
          src={
            product.img
              ? `${process.env.REACT_APP_SERVER_HOST_URL}//${product.img}`
              : ""
          }
          alt=""
        />
      </div>
      <div className="porduct-details">
        <h6>{product.title}</h6>
        <p className="price">
          <TbCurrencyTaka />
          {Math.floor(product.price - product.price * (product.discount / 100))}
        </p>
        <div className="old-price">
          <p>
            <TbCurrencyTaka />
            {Math.floor(product.price)}
          </p>
        </div>
        <p className="point">Point: {Math.floor(Number(product.price) / 12)}</p>

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
      <div className="product-btn">
        <button
          className="add-to-tart"
          onClick={() => handleDeleteProduct(product._id)}
        >
          <AiFillDelete />
          Delete
        </button>
      </div>
    </div>
  );
};

export default AdminPackagesCart;

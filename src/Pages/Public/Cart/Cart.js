import React from "react";
import "./Cart.css";
import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import { TbCurrencyTaka } from "react-icons/tb";
import { handleAddToCart, handleRemvoveToCart } from "../../../Functions/cart";
import { useDispatch, useSelector } from "react-redux";
import { addCart, removeCart } from "../../../Store/CartSlice/CartSlice";
import { RiDeleteBinLine } from "react-icons/ri";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Cart = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [summaryInfo, setSummaryInfo] = useState({
    totaProduct: 0,
    delvaryCharge: 0,
    totalPrice: 0,
  });
  const query = useSelector((state) => state.query.data); 

  const dispatch = useDispatch();

  const cartItems = JSON.parse(localStorage.getItem("cartArray"));

  useEffect(() => {
    console.log(cartItems);

    if (cartItems?.length > 0) {
      const filterArray = cartItems.filter((pd) => pd.id && pd.quantity);

      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public_product/cart-products`, {
        method: "POST",
        body: JSON.stringify(filterArray),
        headers: {
          "content-type": "application/json; charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data form res", data);
          if (data.data) {
            setCartProducts(data.data);
          }
        });
    }
  }, []);
  useEffect(() => {
    if (cartProducts?.length) {
      const newSummaryInfo = { ...summaryInfo };
      let totaProduct = 0;
      let totalPrice = 0;

      cartProducts.map((pd) => {
        totaProduct = totaProduct + Number(pd.quantity);
        totalPrice =
          totalPrice +
          Number(
            Number(
              Number(pd.price) -
                Number(Number(pd.price) * (Number(pd.discount) / 100))
            ) * Number(pd.quantity)
          );
        newSummaryInfo.totaProduct = totaProduct;
        newSummaryInfo.totalPrice = Math.floor(totalPrice);
      });
      setSummaryInfo(newSummaryInfo);
    }
  }, [cartProducts]);

  const handleQuantity = async (id, quentity, type) => {
    const newCartProducts = await cartProducts.map((pd) => {
      if (id === pd._id) {
        if (type === "plus") {
          handleAddToCart(pd._id, query);
          dispatch(addCart());
          console.log(pd);
          pd.quantity = Number(pd.quantity) + 1;
          return pd;
        } else if (pd.quantity > 1 && type === "minus") {
          handleRemvoveToCart(pd._id);
          dispatch(removeCart());
          pd.quantity = pd.quantity - 1;
          return pd;
        } else {
          return pd;
        }
      } else {
        return pd;
      }
    });
    setCartProducts(newCartProducts);
  };
  const handleDelete = (id, quantity) => {
    const filterInfo = cartProducts.filter((pd) => {
      if (pd._id !== id) {
        return true;
      }
      if (pd._id === id) {
        dispatch(removeCart(Number(quantity)));
        const cartArray = JSON.parse(localStorage.getItem("cartArray"));
        console.log(cartArray);

        if (cartArray?.length > 0) {
          const newCartArray = cartArray.filter((info) => {
            if (info.id !== id) {
              return true;
            }
          });

          localStorage.setItem("cartArray", JSON.stringify(newCartArray));
        }
      }
    });

    setCartProducts(filterInfo);
  };

  return (
    <div className="cart-body  container-lg">
      {cartProducts?.length > 0 ? (
        <>
          <div className="">
            <div className="item-container">
              {cartProducts.map((pd) => {
                return (
                  <div className="inner-container" key={pd._id}>
                    <img src={`${process.env.REACT_APP_SERVER_HOST_URL}/${pd.img}`} alt="" />
                    <div className="info-container">
                      <h6>{pd.title}</h6>
                      <p>
                        {pd.detailsArray[0].property} :
                        {pd.detailsArray[0].value}
                      </p>
                      <div>
                        <span>
                          <TbCurrencyTaka /> {pd.price}
                        </span>{" "}
                        <strong>
                          <TbCurrencyTaka />
                          {Number(pd.price) -
                            Number(
                              Number(pd.price) * (Number(pd.discount) / 100)
                            )}
                        </strong>
                        <span>{pd.discount}% off</span>
                      </div>
                      <p>Quantity: {pd.quantity}</p>
                    </div>
                    <div className="quantity-changer">
                      <div
                        onClick={() =>
                          handleQuantity(pd._id, pd.quantity, "plus")
                        }
                      >
                        <FaPlus />
                      </div>
                      <div>
                        <p>{pd.quantity}</p>
                      </div>
                      <div
                        onClick={() =>
                          handleQuantity(pd._id, pd.quantity, "minus")
                        }
                      >
                        <FaMinus />
                      </div>
                    </div>
                    <div
                      className="delete"
                      onClick={() => handleDelete(pd._id, pd.quantity)}
                    >
                      <RiDeleteBinLine />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div>
            <div className="cart-summary">
              <h5>Order Summary</h5>
              <p>Total Products: {summaryInfo.totaProduct}pic</p>
              <p>Delevary Charge: 0 TK</p>
              <p>Products Price Charge: {summaryInfo.totalPrice} TK</p>
              <span>Total: {summaryInfo.totalPrice} Tk</span>
              <button
                type="button"
                className="btn btn-success mt-3 d-block mx-auto"
              >
                <Link
                  to="/buy_now"
                  style={{ color: "#fff", textDecoration: "none" }}
                >
                  Process To Checkout
                </Link>
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="no-data-container">
          <div className="no-data">
            <div>
              <AiOutlineShoppingCart/>
              <p>Your cart is empty !</p>
              <NavLink to="/">Shop Now</NavLink>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

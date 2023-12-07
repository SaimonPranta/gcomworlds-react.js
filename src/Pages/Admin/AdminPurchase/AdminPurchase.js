import React, { useEffect, useState } from "react";
import "./AdminPurchase.css";
import { MdDelete } from "react-icons/md";
import { MdKeyboardArrowRight } from "react-icons/md";
import { getCookie } from "../../../Hooks/cookies";
import failed from "../../../Shades/Toastes/failed";
import sucess from "../../../Shades/Toastes/sucess";
import { useDispatch } from "react-redux";

const AdminPurchase = () => {
  const [purchase, setPurchase] = useState([]); 
  const [products, setProducts] = useState({}); 


  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/buy_product/get_all_buy_request`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("all Purchase", data);
        if (data.data) {
          setPurchase(data.data);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }, []);

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/buy_product/buy_request_delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.sucess) {
          sucess(data.sucess);
          setPurchase(purchase.filter((item) => item._id !== id));
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };
  const getProducts = (id, cartItems) => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public_product/cart-products`, {
      method: "POST",
      body: JSON.stringify(cartItems),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json({ ids: cartItems }))
      .then((data) => {
        console.log("data form res", data);
        if (data.data) {
          setProducts({ itemID: id, products: [...data.data] });

        }
      });
  };
console.log(products);
  return (
    <section className="purchase-request ">
      <div className="d-flex align-item-center">
        <h4>Admin Purchase Requests</h4>
      </div>
      <div className="purchase-container">
        {purchase.length > 0 ? (
          purchase.map((item) => {
            return (
              <div className="inner-container" key={item._id}>
                <div className="text-conatiner">
                  <p> Name: {item.fullName}</p>
                  {item?.userID && <p> User ID: {item.userID}</p>}
                  <p>Mobile Number: {item.mobileBankNumber}</p>
                  <p>City: {item.city}</p>
                  <p>Upazila: {item.upazila}</p>
                  <p>Streets: {item.streets}</p>
                </div>

                <div>
                  <p>
                    Delivary Charge:{" "}
                    {item.productCostInfo?.delvaryCharge
                      ? item.productCostInfo?.delvaryCharge
                      : 0}
                  </p>
                  <p>
                    Total Products:{" "}
                    {item.productCostInfo?.totaProduct
                      ? item.productCostInfo?.totaProduct
                      : 0}
                  </p>
                  <p>
                    Price:{" "}
                    {item.productCostInfo?.totalPrice
                      ? item.productCostInfo?.totalPrice
                      : 0}
                  </p>
                  <p>
                    Total Price:{" "}
                    {item.productCostInfo?.delvaryCharge +
                      item.productCostInfo?.totalPrice}
                  </p>
                  <p></p>
                </div>
                <div>
                  <p>Payment Info </p>
                  <p>
                    Mobile Bank:
                    {item.provider}
                  </p>
                  <p>
                    {item.provider} Number:
                    {item.mobileBankNumber}
                  </p>
                  {item?.transitionID && (
                    <p>
                      Transition ID:
                      {item.transitionID}
                    </p>
                  )}
                  <p>
                    Payed:
                    {item.amountOfTK ? item.amountOfTK : 0} Tk
                  </p>
                </div>
                <div className="option">
                  <MdDelete
                    className="delete"
                    onClick={() => handleDelete(item._id)}
                  />
                  <button onClick={() => getProducts(item._id, item.cartArray)}>
                    Products <MdKeyboardArrowRight />
                    <div className="main-product-contianer">
                      {products?.itemID &&
                      products?.itemID == item._id &&
                      products?.products?.length > 0 ? (
                        products.products.map((pd) => {
                          console.log(pd);
                          let price = Number(pd.price);
                          let quantity = Number(pd.quantity);
                          let discount = item.userID
                            ? Number(pd.discountForUser)
                            : Number(pd.discount);
                          let totalPrice = price * quantity;
                          let totaDiscount =
                            totalPrice * Number(discount / 100);
                          let total = Math.floor(totalPrice - totaDiscount);

                          return (
                            <div className="inner-container">
                              <img
                                src={
                                  pd.img
                                    ? `${process.env.REACT_APP_SERVER_HOST_URL}/${pd.img}`
                                    : ""
                                }
                                alt=""
                              />
                              <div>
                                <h6>{pd.title}</h6>
                                <p className="price">
                                  Price:{" "}
                                  <strong>
                                    {item.userID ? (
                                      <>
                                        {Math.floor(pd.price) -
                                          Number(
                                            Number(pd.price) *
                                              (Number(pd.discountForUser) / 100)
                                          )}
                                      </>
                                    ) : (
                                      <>
                                        {Math.floor(pd.price) -
                                          Number(
                                            Number(pd.price) *
                                              (Number(pd.discount) / 100)
                                          )}
                                      </>
                                    )}
                                  </strong>{" "}
                                  TK
                                </p>
                                <p className="discount">
                                  Discount:{" "}
                                  <strong>
                                    {item.userID ? (
                                      <>{pd?.discountForUser} </>
                                    ) : (
                                      <>{pd?.discount}</>
                                    )}
                                    %
                                  </strong>
                                </p>
                                <p className="quantity">
                                  Quantity: <strong>{pd?.quantity}</strong> pic
                                </p>
                                <p className="total">
                                  Total: <strong>{total}</strong> Tk
                                </p>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="not-task">
                          {" "}
                          <p>
                            No Product Available <strong>!</strong>
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="not-task">
            {" "}
            <p>
              You Have No Purchase Request Yet <strong>!</strong>
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPurchase;

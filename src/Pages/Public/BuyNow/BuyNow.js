import React, { useEffect } from "react";
import "./BuyNow.css";
import { TbTruckDelivery } from "react-icons/tb";
import { GoBell } from "react-icons/go";
import { AiFillStar } from "react-icons/ai";
import { MdFileDownloadDone } from "react-icons/md";
import { useState } from "react";
import failed from "../../../Shades/Toastes/failed";
import sucess from "../../../Shades/Toastes/sucess";
import ButtonLoading from "../../../Models/ButtonLoading/ButtonLoading";
import { ToastContainer } from "react-toastify";
import logo from "../../../Assets/Images/Logo/mainLogo.png";
import dateProvider from "../../../Functions/dateProvider";

import { jsPDF } from "jspdf";
import { useSelector } from "react-redux";
const doc = new jsPDF();

const BuyNow = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [inputInfo, setInputInfo] = useState({
    provider: "Bkash",
  });
  const [cartProducts, setCartProducts] = useState([]);
  const [summaryInfo, setSummaryInfo] = useState({
    totaProduct: 0,
    delvaryCharge: 0,
    totalPrice: 0,
  });
  const [userID, setUserID] = useState(false);
  const user = useSelector((state) => state.user.data);

  const cartItems = JSON.parse(localStorage.getItem("cartArray"));

  useEffect(() => {
    console.log(cartItems);
    if (cartItems?.length > 0) {
      const filterArray = cartItems.filter((pd) => pd.id && pd.quantity);

      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/public_product/cart-products`,
        {
          method: "POST",
          body: JSON.stringify(filterArray),
          headers: {
            "content-type": "application/json; charset=UTF-8",
          },
        }
      )
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
    if (user._id) {
      setInputInfo((state) => {
        return {
          ...state,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          userMetaData: {
            userID: user.userID,
            accountType: user.accountType,
          },
          affiliateMetaData: {
            userID: user.userID,
          },
        };
      });
      setStep(2);
    }
  }, [user]);

  useEffect(() => {
    if (cartProducts?.length) {
      const newSummaryInfo = { ...summaryInfo };
      let totaProduct = 0;
      let totalPrice = 0;

      cartProducts.map((pd) => {
        console.log(pd);
        totaProduct = totaProduct + Number(pd.quantity);
        if (userID) {
          totalPrice =
            totalPrice +
            Number(
              Number(
                Number(pd.price) -
                  Number(Number(pd.price) * (Number(pd.discountForUser) / 100))
              ) * Number(pd.quantity)
            );
        } else {
          totalPrice =
            totalPrice +
            Number(
              Number(
                Number(pd.price) -
                  Number(Number(pd.price) * (Number(pd.discount) / 100))
              ) * Number(pd.quantity)
            );
        }
        newSummaryInfo.totaProduct = totaProduct;
        newSummaryInfo.totalPrice = Math.floor(totalPrice);
      });
      setSummaryInfo(newSummaryInfo);
    }
  }, [cartProducts, userID]);

  const handleInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const currntInfo = { ...inputInfo };
    currntInfo[name] = value;
    setInputInfo(currntInfo);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (JSON.parse(localStorage.getItem("cartArray")) === null) {
      return failed("Sorry, Your Cart are Empty");
    }
    if (step === 1) {
      if (!inputInfo.fullName || !inputInfo.phoneNumber) {
        return failed("Please fill the full form");
      } else {
        if (inputInfo.userID && !userID) {
          console.log("hello");
          return failed("Please provide a valid user ID or ignore this fild");
        }
        setStep(2);
      }
    } else if (step === 2) {
      if (!inputInfo.city || !inputInfo.upazila || !inputInfo.streets) {
        return failed("Please fill the full form");
      } else {
        setStep(3);
      }
    } else if (step === 3) {
      if (
        !inputInfo.fullName ||
        !inputInfo.phoneNumber ||
        !inputInfo.city ||
        !inputInfo.upazila ||
        !inputInfo.streets ||
        !inputInfo.provider ||
        !inputInfo.mobileBankNumber ||
        !inputInfo.amountOfTK ||
        !inputInfo.transitionID
      ) {
        return failed("Please fill the full form");
      }
      const cartArray = JSON.parse(localStorage.getItem("cartArray"));
      const filterArray = cartArray.filter((pd) => pd.id && pd.quantity);
      setLoading(true);
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/buy_product/buy_request`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...inputInfo,
            productCostInfo: { ...summaryInfo },
            cartArray: [...filterArray],
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);

          console.log(data);
          if (data.success) {
            sucess(data.success);
            setStep(4);
            localStorage.setItem("cartArray", JSON.stringify([]));
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
    }
  };

  const userIDVerify = (e) => {
    console.log(e.target.value);
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/public/user_verifier/${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        // setLoading(false);

        console.log(data);
        if (data.success) {
          setUserID(true);
        } else {
          setUserID(false);
        }
      });
  };

  const handleDownload = () => {
    doc.addImage(logo, "JPEG", 60, 10, 90, 40);

    doc.setFontSize(22);
    doc.text("Products Information", 10, 95);

    doc.setFontSize(18);
    doc.text(`Product Quentity: ${summaryInfo?.totaProduct} pic`, 10, 110);
    doc.text(`Products Price: ${summaryInfo?.totalPrice} TK`, 10, 120);
    doc.text(`Delevary Charge: ${summaryInfo?.delvaryCharge} TK`, 10, 130);
    doc.text(`___________________________`, 10, 132);
    doc.text(
      `Total: ${summaryInfo?.totalPrice + summaryInfo?.delvaryCharge} TK`,
      10,
      140
    );

    doc.setFontSize(22);
    doc.text(`Payments Information`, 10, 160);

    doc.setFontSize(18);
    doc.text(
      `Payed By: ${inputInfo.provider ? inputInfo.provider : "Bkash"}`,
      10,
      170
    );
    doc.text(`Number: ${inputInfo?.mobileBankNumber}`, 10, 180);
    doc.text(`Transition ID: ${inputInfo?.transitionID}`, 10, 190);
    doc.text(
      `Amount: ${inputInfo?.amountOfTK ? inputInfo?.amountOfTK : 0} TK`,
      10,
      200
    );
    doc.text(`Date: ${dateProvider(new Date())}`, 10, 210);
    doc.save();
  };

  return (
    <section className="buy-now-container">
      <section>
        {step !== 1 && (
          <div className="empty-info-container">
            <div className="title">
              <p>1</p>
              <h6>User Information</h6>
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="info-container">
            <div className="title">
              <p>1</p>
              <h6>User Information</h6>
            </div>
            <div className="inner-container">
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="fullName"
                      value={inputInfo?.fullName ? inputInfo.fullName : ""}
                      onChange={handleInput}
                      required
                      placeholder=" "
                    />
                    <span className="input__label">Full Name</span>
                  </label>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="phoneNumber"
                      value={
                        inputInfo?.phoneNumber ? inputInfo.phoneNumber : ""
                      }
                      onChange={handleInput}
                      required
                      placeholder=" "
                    />
                    <span className="input__label">Phone Number</span>
                  </label>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="userID"
                      value={inputInfo?.userID ? inputInfo.userID : ""}
                      onChange={handleInput}
                      onKeyUp={userIDVerify}
                      placeholder=" "
                    />
                    <span className="input__label">User ID</span>
                  </label>
                  <input type="submit" value="Continue" />
                </form>
              </div>
              <div className="advise-container">
                <p className="adv-title">Advantages of user information</p>
                <div className="adv-inner-container">
                  <p>
                    <TbTruckDelivery />
                    Easily Track Orders, Hassle free Returns
                  </p>
                  <p>
                    <GoBell /> Get Relevant Alearts and Recommendation
                  </p>
                  <p>
                    <AiFillStar /> Wishlist, Reviews, Ratings and more
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section>
        {step !== 2 && (
          <div className="empty-info-container">
            <div className="title">
              <p>2</p>
              <h6>Delevery Information</h6>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="info-container">
            <div className="title">
              <p>2</p>
              <h6>Delevery Information</h6>
            </div>
            <div className="inner-container">
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="city"
                      value={inputInfo?.city ? inputInfo.city : ""}
                      onChange={handleInput}
                      required
                      placeholder=" "
                    />
                    <span className="input__label">City</span>
                  </label>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="upazila"
                      value={inputInfo?.upazila ? inputInfo.upazila : ""}
                      onChange={handleInput}
                      required
                      placeholder=" "
                    />
                    <span className="input__label">Upazila</span>
                  </label>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="streets"
                      value={inputInfo?.streets ? inputInfo.streets : ""}
                      onChange={handleInput}
                      required
                      placeholder=" "
                    />
                    <span className="input__label">Streets</span>
                  </label>
                  <input type="submit" value="Continue" />
                </form>
              </div>
              <div className="advise-container">
                <p className="adv-title">Advantages of user information</p>
                <div className="adv-inner-container">
                  <p>
                    <TbTruckDelivery />
                    Easily Track Orders, Hassle free Returns
                  </p>
                  <p>
                    <GoBell /> Get Relevant Alearts and Recommendation
                  </p>
                  <p>
                    <AiFillStar /> Wishlist, Reviews, Ratings and more
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section>
        {step !== 3 && (
          <div className="empty-info-container">
            <div className="title">
              <p>3</p>
              <h6>Payment Information</h6>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="info-container">
            <div className="title">
              <p>3</p>
              <h6>Payment Information</h6>
            </div>
            <div className="inner-container">
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <div className="select-input-common-style">
                    <p>Provider</p>
                    <select
                      name="provider"
                      value={inputInfo.provider ? inputInfo.provider : "Bkash"}
                      onChange={handleInput}
                      required
                    >
                      {/* <option>-- select points --</option> */}
                      <option value="Bkash">Bkash</option>
                      <option value="Nagad">Nagad</option>
                    </select>
                  </div>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="mobileBankNumber"
                      value={
                        inputInfo?.mobileBankNumber
                          ? inputInfo.mobileBankNumber
                          : ""
                      }
                      onChange={handleInput}
                      required
                      placeholder=" "
                    />
                    <span className="input__label"> Mobile Bank Number</span>
                  </label>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="transitionID"
                      value={
                        inputInfo?.transitionID ? inputInfo.transitionID : ""
                      }
                      onChange={handleInput}
                      required
                      placeholder=" "
                    />
                    <span className="input__label">
                      Transition ID/Bank Memo Number
                    </span>
                  </label>
                  <label className="input">
                    <input
                      className="input__field"
                      type="text"
                      name="amountOfTK"
                      value={inputInfo?.amountOfTK ? inputInfo.amountOfTK : ""}
                      onChange={handleInput}
                      required
                      placeholder=" "
                    />
                    <span className="input__label">Amount Of TK</span>
                  </label>

                  {!loading ? (
                    <input type="submit" value="Continue" />
                  ) : (
                    <ButtonLoading />
                  )}
                </form>
              </div>
              <div>
                <div className="our-bank-continer">
                  <p>
                    Our Mobile Bank Number :{" "}
                    <strong>
                      01881476432 <samp>(Bkash, Nagad)</samp>
                    </strong>
                  </p>
                </div>
                <div className="our-bank-continer cost-info">
                  <p>
                    Total Products: <strong>{summaryInfo?.totaProduct}</strong>{" "}
                    pic
                  </p>
                  <p>
                    Delevary Charge:{" "}
                    <strong>{summaryInfo?.delvaryCharge}</strong> Tk
                  </p>
                  <p>
                    Products Price Charge:{" "}
                    <strong>{summaryInfo?.totalPrice}</strong> TK
                  </p>
                  <p>
                    Total:{" "}
                    <strong>
                      {summaryInfo?.delvaryCharge + summaryInfo?.totalPrice}
                    </strong>
                    Tk
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <section>
        {step !== 4 && (
          <div className="empty-info-container">
            <div className="title">
              <p>4</p>
              <h6>Request Status</h6>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="info-container">
            <div className="title">
              <p>4</p>
              <h6>Request Status</h6>
            </div>
            <div className="inner-container">
              <div className="done">
                <div className="icon">
                  <MdFileDownloadDone />
                </div>
                <h6>Done !</h6>
                <button onClick={handleDownload}>Download </button>
              </div>
              <div>
                <div className="our-bank-continer">
                  <p>
                    Our Mobile Bank Number :{" "}
                    <strong>
                      01881476432 <samp>(Bkash, Nagad)</samp>
                    </strong>
                  </p>
                </div>
                <div className="our-bank-continer cost-info">
                  <p>
                    Total Products: <strong>{summaryInfo?.totaProduct}</strong>{" "}
                    pic
                  </p>
                  <p>
                    Delevary Charge:{" "}
                    <strong>{summaryInfo?.delvaryCharge}</strong> Tk
                  </p>
                  <p>
                    Products Price Charge:{" "}
                    <strong>{summaryInfo?.totalPrice}</strong> TK
                  </p>
                  <p>
                    Total:{" "}
                    <strong>
                      {summaryInfo?.delvaryCharge + summaryInfo?.totalPrice}
                    </strong>
                    Tk
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      <ToastContainer />
    </section>
  );
};

export default BuyNow;

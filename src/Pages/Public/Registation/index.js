import React, { useState } from "react";
import "./style.css";
import UserRegistration from "./UserRegistration/index";
import BuyerRegistration from "./BuyerRegistration/index"; 
import SellerRegistration from "./SellerRegistration/index"; 

const Index = () => {
  const [condition, setCondition] = useState({
    userType: "user",
    showOtpModal: true,
  });
  const getActiveClass = (name) => {
    if (condition.userType === name) {
      return "active";
    }
    return "";
  };
  const handleSelectUserType = (type) => {
    setCondition((state) => {
      return { ...state, userType: type };
    });
  };

  return (
    <div className="registration-page">
      <div className="inner-container">
        <div className="top-section light-shadow">
          <div
            className={getActiveClass("user")}
            onClick={() => handleSelectUserType("user")}
          >
            <input
              checked={condition.userType === "user" ? true : false}
              name="userType"
              type="radio"
            />
            <label>Regular User</label>
          </div>
          <div
            className={getActiveClass("buyer")}
            onClick={() => handleSelectUserType("buyer")}
          >
            <input
              checked={condition.userType === "buyer" ? true : false}
              name="userType"
              type="radio"
            />
            <label>Buyer</label>
          </div>
          <div
            className={getActiveClass("seller")}
            onClick={() => handleSelectUserType("seller")}
          >
            <input
              checked={condition.userType === "seller" ? true : false}
              name="userType"
              type="radio"
            />
            <label>Seller</label>
          </div>
        </div>
        {condition.userType === "user" ? (
          <UserRegistration />
        ) : condition.userType === "buyer" ? (
          <BuyerRegistration />
        ) : condition.userType === "seller" ? (
          <SellerRegistration />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Index;

import React from "react";
import "./Loading.css";
import gifLogo from "../../Assets/Images/Logo/ladingLogo.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img src={gifLogo} alt="" />
    </div>
  );
};

export default Loading;

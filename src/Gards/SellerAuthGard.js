import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import checkUser from "../CustomHooks/CheckUserHook";
import Loading from "../Shades/Loading/Loading";

const SellerAuthGard = ({ children }) => {
  const user = useSelector((state) => state.user.data);
  const { loading, error } = checkUser();
  const location = useLocation();

  return loading ? (
    <Loading />
  ) : user?._id && user.accountType === "seller" ? (
    children
  ) : user?._id ? (
    <Navigate to="/" state={{ from: location }} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default SellerAuthGard;

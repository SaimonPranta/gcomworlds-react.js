import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import checkUser from "../CustomHooks/CheckUserHook"; // Updated import
import Loading from "../Shades/Loading/Loading";

const BuyerAuthGard = ({ children }) => {
  const user = useSelector((state) => state.user.data);
  const { loading, error } = checkUser();

  console.log("user", user);
  const location = useLocation();

  // if (loading) {
  //  return <Loading />;
  // }

  console.log("loading ===>>>", loading);

  return loading ? (
    <Loading />
  ) : user?._id && user.accountType === "buyer" ? (
    children
  ) : user?._id ? (
    <Navigate to="/" state={{ from: location }} />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default BuyerAuthGard;

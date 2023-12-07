import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const CommonGard = ({ children }) => {
  const user = useSelector((state) => state.user.data);
  const location = useLocation();

  return user?._id ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
};

export default CommonGard;

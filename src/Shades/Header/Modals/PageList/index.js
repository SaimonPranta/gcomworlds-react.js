import React from "react";
import "./style.scss";
import { NavLink } from "react-router-dom";

const pageArray = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "E-Commerce",
    path: "/ecommerce",
  },
  {
    label: "Service",
    path: "/services",
  },
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "Registration",
    path: "/registaion",
  },
  {
    label: "About Us",
    path: "/about_us",
  },
];

const Index = () => {
  return (
    <div className="page-list" >
      <div>
        {pageArray.map((item) => {
          return <NavLink to={item.path}>{item.label}</NavLink>;
        })}
      </div>
    </div>
  );
};

export default Index;

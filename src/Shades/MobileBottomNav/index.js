import React from "react";
import "./styles.scss";
import { FaCartArrowDown, FaHome } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { MdPages } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import Categories from "./Categories/index";
import Pages from "./Pages/index";

const Index = () => {
  const navigateCategories = () => {
    const categoryPage = document.getElementById("categories-page");
    if (!categoryPage) {
      return;
    }
    categoryPage.classList.add("active");
  };
  const removeCategories = () => {
    const categoryPage = document.getElementById("categories-page");
    if (!categoryPage) {
      return;
    }
    categoryPage.classList.remove("active");
  };
  const removePageList = () => {
    const categoryPage = document.getElementById("page-container");
    if (!categoryPage) {
      return;
    }
    categoryPage.classList.remove("active");
  };
  const navigatePageList = () => {
    const categoryPage = document.getElementById("page-container");
    if (!categoryPage) {
      return;
    }

    categoryPage.classList.add("active");
  };
  const navigatePages = (name) => {
    removeAllPages();


    switch (name) {
      case "categories":
        navigateCategories();
        break;

      case "pages":
        navigatePageList();
        break;

      default:
        break;
    }
  };
  const removeAllPages = () => {
    removeCategories();
    removePageList();
  };

  return (
    <div className="mobile-bottom-nav mobile">
      <div className="inner-container">
        <div>
          <NavLink to="/" onClick={removeAllPages}>
            <FaHome />
            <p>Home</p>
          </NavLink>
        </div>
        <div onClick={() => navigatePages("categories")}>
          <RxDashboard />
          <p>Categories</p>
        </div>
        <div onClick={() => navigatePages("pages")}>
          <MdPages />
          <p>Pages</p>
        </div>
        <div>
          <NavLink to="/cart" onClick={removeAllPages}>
            <FaCartArrowDown />
            <p>Cart</p>
          </NavLink>
        </div>
        <div>
          <NavLink to="/profile" onClick={removeAllPages}>
            <CgProfile />
            <p>Profile</p>
          </NavLink>
        </div>
      </div>

      <div className="page-container">
        <Categories />
        <Pages />
      </div>
    </div>
  );
};

export default Index;

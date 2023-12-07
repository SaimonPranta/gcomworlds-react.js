import React, { useState } from "react";
import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import profileImg from "../../Assets/Images/Icons/useravatar.jpg";
import { useSelector } from "react-redux";
import { SlHandbag } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";

import mainLogo from "../../Assets/Images/Logo/mainLogo.png";
import SearchProductView from "../SearchProductView/SearchProductView";

const Header = () => {
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.data);
  const [allProducts, setAllProducts] = useState([]);

  const { pathname } = useLocation();

  const handleSearch = (e) => {
    const value = e.target.value;
    if (value.length < 2) {
      return setAllProducts([]);
    }

    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/public_product/search_product/${value}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setAllProducts(data.data);
        } else {
        }
      });
  };

  return (
    <section className="header">
      <div className="header-container">
        <nav
          className="navbar navbar-expand-md navbar-light  container-lg px-lg-0 px-1 px-sm-5"
          id="navbar-light"
        >
          <div className="container-fluid nav-container">
            <div className="logo">
              <NavLink to="/" className="navbar-brand" href="#">
                {/* GcomWorld.com */}
                <img src={mainLogo} alt="" />
              </NavLink>
            </div>

            <div>
              {(pathname === "/" ||
                pathname === "/ecommerce" ||
                pathname === "/services") && (
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search products"
                    onChange={handleSearch}
                    // onBlur={() => setAllProducts([])}
                  />
                  <button>
                    <BsSearch />{" "}
                  </button>
                </div>
              )}
            </div>

            <button
              className="navbar-toggler  ms-auto"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="mobile-nav-list d-block d-md-none ms-1 "
              id="NNNnavbarSupportedContent"
            >
              <ul className=" d-flex ms-auto mb-2 mb-lg-0">
                {user?._id && (
                  <>
                    <li className="nav-item user pt-1">
                      <NavLink className="nav-link" to="/profile">
                        <img
                          src={
                            user?.img
                              ? `${process.env.REACT_APP_SERVER_HOST_URL}/${user.img}`
                              : profileImg
                          }
                          alt=""
                        />
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 header-ul">
                <li className="nav-item">
                  <NavLink to="/" className="nav-link" aria-current="page">
                    Home
                  </NavLink>
                </li>
                {user._id && (
                  <li className="nav-item">
                    <NavLink to="/profile" className="nav-link">
                      Dashboard
                    </NavLink>
                  </li>
                )}
                {!user._id && (
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                )}
                {!user._id && (
                  <li className="nav-item">
                    <NavLink to="/registaion" className="nav-link">
                      Registation
                    </NavLink>
                  </li>
                )}

                <li className="nav-item">
                  <NavLink to="/ecommerce" className="nav-link">
                    E-commerce
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/services" className="nav-link">
                    Services
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/about_us" className="nav-link">
                    About Us
                  </NavLink>
                </li>
                <li className="nav-item bag-icon">
                  <NavLink to="/cart" className="nav-link">
                    <SlHandbag />
                    <div>{cart}</div>
                  </NavLink>
                </li>

                {user?._id && (
                  <>
                    <li className="nav-item user d-none d-md-block">
                      <NavLink className="nav-link" to="/profile">
                        <img
                          src={
                            user?.img
                              ? `${process.env.REACT_APP_SERVER_HOST_URL}/${user.img}`
                              : profileImg
                          }
                          alt=""
                        />
                      </NavLink>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>
        {allProducts.length > 0 && (
          <SearchProductView allProducts={allProducts} />
        )}
      </div>
    </section>
  );
};

export default Header;

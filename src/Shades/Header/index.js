import React from "react";
import "./styles.scss";
import { MdPages, MdSell } from "react-icons/md";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import mainLogo from "../../Assets/Images/Logo/mainLogo.png";
import { AiOutlineSearch } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { TbWorld } from "react-icons/tb";
import { IoIosArrowDown } from "react-icons/io";
import { FaCartArrowDown } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";
import { useSelector } from "react-redux";
import profileImg from "../../Assets/Images/Icons/useravatar.jpg";
import PageList from "./Modals/PageList/index";
import SearchContainer from "./Modals/SearchContainer/index";

const Index = () => {
  const user = useSelector((state) => state.user.data);
  const cart = useSelector((state) => state.cart.data);
  const [allProducts, setAllProducts] = useState([]);

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

  const [time, setTime] = useState({
    hour: Number(24 - new Date().getHours()),
    min: Number(60 - new Date().getMinutes()),
    sec: Number(60 - new Date().getSeconds()),
  });
  let intervalFunction = null;

  // useEffect(() => {
  //   handelTimer();
  //   return () => clearInterval(intervalFunction);
  // }, []);

  // const handelTimer = () => {
  //   intervalFunction = setInterval(() => {
  //     const newTime = {
  //       hour:
  //         Number(24 - new Date().getHours()).toString().length > 1
  //           ? Number(24 - new Date().getHours())
  //           : "0" + Number(24 - new Date().getHours()),
  //       min:
  //         Number(60 - new Date().getMinutes()).toString().length > 1
  //           ? Number(60 - new Date().getMinutes())
  //           : "0" + Number(60 - new Date().getMinutes()),
  //       sec:
  //         Number(60 - new Date().getSeconds()).toString().length > 1
  //           ? Number(60 - new Date().getSeconds())
  //           : "0" + Number(60 - new Date().getSeconds()),
  //     };
  //     setTime(newTime);
  //   }, 1000);
  // };
  const handleCategories = () => {
    const html = document.querySelector("Html");

    if (!html) {
      return;
    }
    html.classList.toggle("active-page-body");
  };
  const handlePageList = () => {
    const html = document.querySelector("Html");

    if (!html) {
      return;
    }
    html.classList.toggle("active-page-body");
  };

  return (
    <div className="header-section">
      <div className="header-top not-mobile">
        <div>
          <MdSell /> <p>Get $20 off across your first 2 orders</p>
        </div>
        <div className="time-count-box">
          <p>{time.hour}</p> <span>:</span>
          <p>{time.min}</p>
          <span>:</span>
          <p>{time.sec}</p>
        </div>
      </div>
      <div className="not-mobile">
        <div className="header-bottom ">
          <div className="logo-container">
            <Link to="/">
              <img src={mainLogo} alt="" />
            </Link>
          </div>
          <div
            className="categories-container categories"
            onClick={handleCategories}
          >
            <RxDashboard />
            <p>Categories</p>
          </div>
          <button className="categories-container pages">
            <MdPages />
            <p>Pages</p>
            <PageList />
          </button>
          <div className="header-search-container">
            <SearchContainer />
          </div>
          <div className="header-menu">
            <div className="profile-signup">
              <ul>
                {user?._id ? (
                  <>
                    <li>
                      <Link to="/profile">
                        <img
                          src={
                            user?.img
                              ? `${process.env.REACT_APP_SERVER_HOST_URL}/${user.img}`
                              : profileImg
                          }
                          alt=""
                        />
                      </Link>
                    </li>
                    <li>
                      <Link to="/profile">{user.fullName}</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <CgProfile />
                    </li>
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>/</li>
                    <li>
                      <Link to="/registaion">SignUp</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>

            <div className="cart-section">
              <NavLink to="/cart">
                <FaCartArrowDown />
                <p>0 item</p>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      <div className="header-most-bottom">
        <SearchContainer />
      </div>
    </div>
  );
};

export default Index;

import React from "react";
// import "./DashborardSideNave.css";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FaList } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa";
import { FaUsersCog } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdWorkOutline } from "react-icons/md";
import { BsCurrencyExchange } from "react-icons/bs";
import { MdArrowForwardIos, MdProductionQuantityLimits } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeCookie } from "../../Hooks/cookies";
import { addUser } from "../../Store/UserSlice/UserSlice";
import { handleDashboardCollaps } from "../../Functions/handleDashboardCollaps";

const DashborardSideNave = () => {
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const hanleLogOut = () => {
    removeCookie();
    dispatch(addUser({}));
    navigate("/", { replace: true });
  };

  const handleNewRegistation = () => {
    removeCookie();
    navigate("/registaion", { replace: true });
  };

  return (
    <>
      <section
        className="dashboard-navication dashboardNavigation"
        id="dashboard-navication"
      >
        <NavLink to="/" className="dashboard-logo">
          GcomWorld.com
        </NavLink>

        <div className="dashboard-navication-title">
          <h6>
            <FaList /> Dashboard Menu
          </h6>
        </div>

        <ul>
          <li>
            <NavLink to="/profile">
              <FaUserAlt />
              <span> Profile</span>
            </NavLink>
          </li>
          {user.isActive && (
            <li>
              <NavLink to="/start_work">
                <MdWorkOutline />
                <span>Start Work</span>
              </NavLink>
            </li>
          )}

          <li>
            <button
              className={
                pathname === "/points/daily_points" ||
                pathname === "/points/regular_points" ||
                pathname === "/points/access_points"
                  ? "active-btn"
                  : ""
              }
            >
              <div>
                <BsCurrencyExchange />
                <span> Points</span>
                <MdArrowForwardIos className="collaps-arrow" />
              </div>
              <ul className="sub-menu-ul">
                <li>
                  <NavLink to="/points/daily_points">
                    <span>Daily Points</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/points/regular_points">
                    <span>Regular Points</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/points/access_points">
                    <span>Accress Points</span>
                  </NavLink>
                </li>
              </ul>
            </button>
          </li>
          {user.isActive && (
            <li>
              <NavLink to="/user/products">
                <MdProductionQuantityLimits />
                <span>Products</span>
              </NavLink>
            </li>
          )}

          <li>
            <NavLink to="/point_transfer">
              <FaHandshake />
              <span> Point transfer</span>
            </NavLink>
          </li>
          <li>
            <button
              className={pathname === "/invoice/inbox" ? "active-btn" : ""}
            >
              <div>
                <FaMoneyCheckAlt />
                <span> Invoice </span>
                <MdArrowForwardIos className="collaps-arrow" />
              </div>
              <ul>
                <li>
                  <a onClick={handleNewRegistation}>
                    <span>New Registaion</span>
                  </a>
                </li>
                <li>
                  <NavLink to="/invoice/inbox">
                    <span>Inbox</span>
                  </NavLink>
                </li>
              </ul>
            </button>
          </li>
          <li>
            <button
              className={
                pathname === "/withdraw/daily_withdraw" ||
                pathname === "/withdraw/regular_withdraw"
                  ? "active-btn"
                  : ""
              }
            >
              <div>
                <FaDonate />
                <span> Withdraw </span>
                <MdArrowForwardIos className="collaps-arrow" />
              </div>
              <ul>
                <li>
                  <NavLink to="/withdraw/daily_withdraw">
                    <span>Daily Points</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/withdraw/regular_withdraw">
                    <span>Regular Points</span>
                  </NavLink>
                </li>
              </ul>
            </button>
          </li>
          <li>
            <button
              type="checkbox"
              className={
                pathname === "/team/placement" || pathname === "/team/refer"
                  ? "active-btn"
                  : ""
              }
            >
              <div>
                <FaUsersCog />
                <span> Team</span>
                <MdArrowForwardIos className="collaps-arrow" />
              </div>
              <ul className="sub-menu-ul">
                <li>
                  <NavLink to="/team/placement">
                    <span>Placement Users</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/team/refer">
                    <span> Refer Users</span>
                  </NavLink>
                </li>
              </ul>
            </button>
          </li>
          {user?._id && user?.accountType === "admin" && (
            <li>
              <NavLink to="/admin/all_user">
                <RiAdminLine />
                <span> Admin Panel </span>
              </NavLink>
            </li>
          )}

          <li className="log-out">
            <a onClick={hanleLogOut}>
              <BiLogOut />
              <span> Log Out</span>
            </a>
          </li>
        </ul>
      </section>
      <div
        className="dashboard-body-blur-div"
        id="dashboard-body-blur"
        onClick={handleDashboardCollaps}
      />
    </>
  );
};

export default DashborardSideNave;

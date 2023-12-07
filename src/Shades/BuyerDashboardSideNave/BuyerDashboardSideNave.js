import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FaList } from "react-icons/fa";
import { FaMoneyCheckAlt } from "react-icons/fa"; 
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { GiHistogram } from "react-icons/gi"; 
import { GiArmorUpgrade } from "react-icons/gi"; 
import { MdArrowForwardIos  } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeCookie } from "../../Hooks/cookies";
import { addUser } from "../../Store/UserSlice/UserSlice";
import { handleDashboardCollaps as handleDashboardCollapse } from "../../Functions/handleDashboardCollaps";

const BuyerDashboardSideNave = () => {
  const user = useSelector((state) => state.user.data);

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeCookie();
    dispatch(addUser({}));
    navigate("/", { replace: true });
  };

  const handleNewRegistration = () => {
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
            <NavLink to="/buyer/profile">
              <FaUserAlt />
              <span> Profile</span>
            </NavLink>
          </li>
          {user.isActive && (
            <li>
              <NavLink to="/buyer/balance">
                <MdOutlineAccountBalanceWallet />
                <span>Balance</span>
              </NavLink>
            </li>
          )}
          {user.isActive && (
            <li>
              <NavLink to="/buyer/buy-history">
                <GiHistogram />
                <span>Buy History</span>
              </NavLink>
            </li>
          )}
          {user.isActive && (
            <li>
              <NavLink to="/buyer/upgrade">
                <GiArmorUpgrade />
                <span>Upgrade</span>
              </NavLink>
            </li>
          )}

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
                  <a onClick={handleNewRegistration}>
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
                pathname === "seller/balance_withdraw" ? "active-btn" : ""
              }
            >
              <div>
                <FaDonate />
                <span> Withdraw </span>
                <MdArrowForwardIos className="collaps-arrow" />
              </div>
              <ul>
                <li>
                  <NavLink to="/buyer/balance_withdraw">
                    <span>Balance Withdraw</span>
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
            <a onClick={handleLogOut}>
              <BiLogOut />
              <span> Log Out</span>
            </a>
          </li>
        </ul>
      </section>
      <div
        className="dashboard-body-blur-div"
        id="dashboard-body-blur"
        onClick={handleDashboardCollapse}
      />
    </>
  );
};

export default BuyerDashboardSideNave;

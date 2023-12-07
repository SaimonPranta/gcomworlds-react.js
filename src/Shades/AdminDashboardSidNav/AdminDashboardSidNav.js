import React from "react"; 
import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { FaList } from "react-icons/fa"; 
import { FaUserAlt } from "react-icons/fa";
import { BiLogOut, BiPurchaseTag } from "react-icons/bi";
import { FaDonate } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { RiDashboardLine } from "react-icons/ri";
import { MdWorkOutline } from "react-icons/md";
import { AiFillSetting } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { removeCookie } from "../../Hooks/cookies";
import { addUser } from "../../Store/UserSlice/UserSlice";
import {MdPendingActions} from "react-icons/md"
import { GoPackage } from "react-icons/go";
import { handleDashboardCollaps } from "../../Functions/handleDashboardCollaps";
import { HiOutlineInboxIn } from "react-icons/hi";

const AdminDashboardSidNav = () => { 
   

  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeCookie();
    dispatch(addUser({}));
    navigate("/", { replace: true });
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
            <FaList /> Admin Menu
          </h6>
        </div>

        <ul>
          <li>
            <NavLink to="/admin/all_user">
              <FaUserAlt />
              <span> All User</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/start_work">
              <MdWorkOutline />
              <span>Start Work</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/new_request">
              <MdPendingActions />
              <span>New Request</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/purchase">
              <BiPurchaseTag />
              <span>Purchase</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/packges">
              <GoPackage />
              <span>Packages</span>
            </NavLink>
          </li>

          <li>
            <button
              className={
                pathname === "/admin/daily_withdraw" ||
                pathname === "/admin/regular_withdraw"
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
                  <NavLink to="/admin/daily_withdraw">
                    <span>Daily Points</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/regular_withdraw">
                    <span>Regular Points</span>
                  </NavLink>
                </li>
              </ul>
            </button>
          </li>
          <li>
            <button
              className={
                pathname === "/admin/products" || pathname === "/admin/services"
                  ? "active-btn"
                  : ""
              }
            >
              <div>
                <MdProductionQuantityLimits />
                <span> Products </span>
                <MdArrowForwardIos className="collaps-arrow" />
              </div>
              <ul>
                <li>
                  <NavLink to="/admin/products">
                    <span>Product</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/admin/services">
                    <span>Services</span>
                  </NavLink>
                </li>
              </ul>
            </button>
          </li>
          <li>
            <NavLink to="/admin/config_setting">
              <AiFillSetting />
              <span> Config Setting</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/invoice/inbox">
              <HiOutlineInboxIn />
              <span>Inbox</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/profile">
              <RiDashboardLine />
              <span> Dashboard </span>
            </NavLink>
          </li>

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
        onClick={handleDashboardCollaps}
      />
    </>
  );
};

export default AdminDashboardSidNav;

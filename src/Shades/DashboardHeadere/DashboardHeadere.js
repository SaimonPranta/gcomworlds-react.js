import React, { useEffect, useState } from "react";
import "./Header.css";
import "./DashboardHeadere.css";
import { NavLink } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdNotifications, MdOutlineCircleNotifications } from "react-icons/md";

import { ToastContainer } from "react-toastify";
import { CgMenuLeftAlt } from "react-icons/cg";
import { handleDashboardCollaps } from "../../Functions/handleDashboardCollaps";
import mainLogo from "../../Assets/Images/Logo/mainLogo.png";
import failed from "../Toastes/failed";

const DashboardHeader = () => {
  const [Notification, setNotification] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/notification`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setNotification(data.data);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }, []);

  return (
    <div className="header dashboard-header">
      <nav className="navbar navbar-expand navbar-light  px-2">
        <div className="container-fluid inner-header">
          <div className="btn-continer">
            <button className="collaps-btn" onClick={handleDashboardCollaps}>
              <CgMenuLeftAlt />
            </button>
          </div>
          <div className="logo mx-auto">
            <NavLink to="/" className="navbar-brand ps-0" href="#">
              <img src={mainLogo} alt="" />
            </NavLink>
          </div>

          <div className="navbar-collapse">
            <ul className="right-siede-icons ms-auto mb-2 mb-lg-0 d-flex  align-items-center">
              <li className="nav-item icons ">
                <button>
                  <MdNotifications />

                  <div
                    className="notificaton-container"
                    id="notificaton-container"
                  >
                    <div>
                      <h6>Notifications</h6>
                      <strong>Earlier</strong>
                    </div>
                    {Notification.length > 0 &&
                      Notification.map((item) => {
                        return (
                          <div className="notification-msg d-flex flex-row  align-items-center p-2 my-2">
                            <div>
                              <MdOutlineCircleNotifications />
                            </div>
                            <div>
                              <p>{item.messsasge}</p>
                              <p className="date">{item.date}</p>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </button>
              </li>

              <li className="nav-item icons">
                <NavLink to="/">
                  <FaHome />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <ToastContainer />
    </div>
  );
};

export default DashboardHeader;

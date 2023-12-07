import React, { useEffect } from "react";
import "./AllUser.css";
import { useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "../../../Hooks/cookies";
import SearchBox from "../../../Shades/SearchBox/SearchBox";
import { tableCollaps } from "../../../Functions/tableCollaps";
import { BsThreeDotsVertical } from "react-icons/bs";
import { addALLUser } from "../../../Store/AllUserSlice/AllUserSlice";
import sucess from "../../../Shades/Toastes/sucess";
import failed from "../../../Shades/Toastes/failed";
import SureVirifyerModel from "../../../Models/SureVirifyerModel/SureVirifyerModel";
import {addModel, hideModel} from '../../../Hooks/handleModel'
const AllUser = () => {
  const [input, setInput] = useState("");
  let allUser = useSelector((state) => state.allUser.data);
  const [userSurray, setUserSummary] = useState({
    totalPendingDailyWithdrawRequest: 0,
    totalPendingRegularWithdrawRequest: 0,
  });
  const [activeUser, setActiveUser] = useState(0);
  const [filterUser, setFilterUser] = useState([]);
  const [searchUser, setSearchUser] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [modelInfo, setModelInfo] = useState({})
  const dispatch = useDispatch();

  useEffect(() => {
    if (getCookie()) {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/user_summary`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setUserSummary(data.data);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (getCookie()) {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/all_user`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            dispatch(addALLUser(data.data));
          }
        });
    }
  }, []);

  useEffect(() => {
    setFilterUser([...allUser]);
    if (allUser.length) {
      const activeUser = allUser.filter((user) => user.isActive === true);
      setActiveUser(activeUser.length);
    }
  }, [allUser]);

  useEffect(() => {
    if (searchInput.length) {
      let currentUser = allUser.filter((valuee) => {
        let stringValue = valuee.userID.toString();
        let userID = stringValue.length > 0 ? stringValue.toString() : "0";
        let varifiying = userID.includes(searchInput.toLowerCase());
        let fullName = valuee.fullName.toLowerCase();
        let finalName = fullName.includes(searchInput.toLowerCase());
        return varifiying || finalName;
      });
      setSearchUser(currentUser);
    }
  }, [searchInput]);

  const handleUserChange = (e) => {
    const vlaue = e.target.value;
    if (allUser && allUser.length > 0) {
      if (vlaue === "active") {
        const allActiveUser = allUser.filter((user) => user.isActive);
        setFilterUser(allActiveUser);
      } else if (vlaue === "unactive") {
        const allUnActiveUser = allUser.filter((user) => !user.isActive);
        setFilterUser(allUnActiveUser);
      } else {
        setFilterUser([...allUser]);
      }
    }
  };
  const handleProfileControl = (e) => {
    // e.target.parentNode.childNodes[0].style.display= "flex"
    e.target.parentNode.childNodes[0].classList.toggle("active_porfile_modal");
  };

  const handlePointDistribute = () => {
    console.log("call handle distribution")
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin/distribute_regualr_points/${input}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          hideModel(
            "sure-verifire-container",
            "active-sure-verifire-container"
          );
          dispatch(addALLUser(data.data));
          sucess(`${input} points Distributed to all User`);
          setInput("");
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };
  const handleSuhmit = () => {
    if (Number(input)) {
      setModelInfo({
        function: handlePointDistribute,
      }); 
      addModel("sure-verifire-container", "active-sure-verifire-container");
    }
  };
  console.log(modelInfo)

  return (
    <section className=" generaion-main">
      <div className="common-form-styles">
        <div className=" genaration ">
          <div>
            <h4>All User Summary</h4>
          </div>
          <div className="d-flex">
            <p>Total User :</p>
            <p className="ps-3">{allUser?.length} person</p>
          </div>
          <div className="d-flex">
            <p>Total Active User :</p>
            <p className="ps-3">{activeUser} Person</p>
          </div>
          <div className="d-flex">
            <p>Total Unactive User :</p>
            <p className="ps-3">{allUser.length - activeUser} Person</p>
          </div>
        </div>
        <div className=" genaration ">
          <div>
            <h4>Total Pending Summary</h4>
          </div>
          <div className="d-flex">
            <p>Total Pending Withdraw Request :</p>
            <p className="ps-3">
              {userSurray.totalPendingDailyWithdrawRequest +
                userSurray.totalPendingRegularWithdrawRequest}
            </p>
          </div>
          <div className="d-flex">
            <p>Total Pending Daily Withdraw Request :</p>
            <p className="ps-3">
              {userSurray.totalPendingDailyWithdrawRequest}
            </p>
          </div>
          <div className="d-flex">
            <p>Total Pending Regular Withdraw Request :</p>
            <p className="ps-3">
              {" "}
              {userSurray.totalPendingRegularWithdrawRequest}
            </p>
          </div>
        </div>
      </div>
      <div className="distribute-section">
        <div>
          <label>Daily Points Distribute</label>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="number"
          />
          <button onClick={handleSuhmit}>Submit</button>
        </div>
      </div>
      <div className="common-searc-container  pt-4 pb-0 mb-0">
        <form
          className="d-flex align-items-center flex-sm-row  pb-0 mb-0"
          autoComplete="off"
        >
          <label className="taitel me-4 mb-2 mb-sm-0">Search Users</label>
          <SearchBox
            placeholder="Type Name or UserID..."
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
        </form>
      </div>

      <div
        className="common-table-style"
        style={{ marginTop: searchInput && "37px" }}
      >
        {!searchInput && (
          <div className="d-flex align-items-center">
            <div className="select-input-common-style sub-generation">
              <h4 className="me-2">Select User</h4>
              <select name="porvider" id="porvider" onChange={handleUserChange}>
                <option value="all">
                  <h4>All User</h4>
                </option>
                <option value="active">Active User</option>
                <option value="unactive">Unactive User</option>
              </select>
            </div>
            <FaAngleDoubleDown
              className="table-collaps-icon"
              id="collaps-icon"
              onClick={tableCollaps}
            />
          </div>
        )}
        {filterUser.length > 0 || searchUser?.length > 0 ? (
          <div
            className="active-common-table-container common-table-container"
            id="table-container"
          >
            <div className="scroll-text">
              <p>scroll it</p>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>User ID</th>
                    <th>Phone Number </th>
                    <th>Daily Points</th>
                    <th>Regular Points</th>
                    <th>Access Points</th>
                    <th>Account Status</th>
                    <th>Joining Date</th>
                    <th>Options</th>
                  </tr>
                </thead>
                <tbody id="porfile_modal_control">
                  {searchInput.length == 0 &&
                    filterUser &&
                    filterUser.length > 0 &&
                    filterUser.map((user, index) => {
                      return (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td className="table-name">{user.fullName}</td>
                          <td>{user.userID}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.dailyPoints}</td>
                          <td>{user.regularPoints}</td>
                          <td>{user.accessPoints}</td>
                          <td>{user.isActive ? "Active" : "Unactive"}</td>
                          <td className="table-date">{user.joinDate}</td>
                          <td className="icons three_dots">
                            <div className="porfile_control_modal">
                              <h6>
                                <NavLink to={"/view_profile/" + user._id}>
                                  {" "}
                                  View Profile
                                </NavLink>
                              </h6>
                              <h6>
                                {/* <a onClick={() => handleViewAsUser(user._id)}>
                                {" "}
                                View As User{" "}
                              </a> */}
                              </h6>
                              <h6>
                                <NavLink to={"/admin/edit_user/" + user._id}>
                                  {" "}
                                  Edit Profile{" "}
                                </NavLink>
                              </h6>
                            </div>
                            <BsThreeDotsVertical
                              onClick={handleProfileControl}
                            />
                          </td>
                        </tr>
                      );
                    })}
                  {searchInput.length > 0 &&
                    searchUser?.length > 0 &&
                    searchUser.map((user, index) => {
                      return (
                        <tr key={user._id}>
                          <td>{index + 1}</td>
                          <td className="table-name">{user.fullName}</td>
                          <td>{user.userID}</td>
                          <td>{user.phoneNumber}</td>
                          <td>{user.dailyPoints}</td>
                          <td>{user.regularPoints}</td>
                          <td>{user.accessPoints}</td>
                          <td>{user.isActive ? "Active" : "Unactive"}</td>
                          <td className="table-date">{user.joinDate}</td>
                          <td className="icons three_dots">
                            <div className="porfile_control_modal">
                              <h6>
                                <NavLink to={"/view_profile/" + user._id}>
                                  {" "}
                                  View Profile
                                </NavLink>
                              </h6>
                              <h6>
                                {/* <a onClick={() => handleViewAsUser(user._id)}>
                                {" "}
                                View As User{" "}
                              </a> */}
                              </h6>
                              <h6>
                                <NavLink to={"/admin/edit_user/" + user._id}>
                                  {" "}
                                  Edit Profile{" "}
                                </NavLink>
                              </h6>
                            </div>
                            <BsThreeDotsVertical
                              onClick={handleProfileControl}
                            />
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="no-history">
            <p>Your have no User Yet !</p>
          </div>
        )}
      </div>
      <SureVirifyerModel props={modelInfo} />
    </section>
  );
};

export default AllUser;

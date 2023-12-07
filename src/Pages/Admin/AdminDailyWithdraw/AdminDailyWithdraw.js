import React, { useEffect, useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import checkIcon from "../../../Assets/Images/Icons/icons8-done-26.png";
import deleteIcon from "../../../Assets/Images/Icons/icons8-delete-32 (1).png";

import { useSelector } from "react-redux";
import { tableCollaps } from "../../../Functions/tableCollaps";
import sucess from "../../../Shades/Toastes/sucess";
import failed from "../../../Shades/Toastes/failed";
import { getCookie } from "../../../Hooks/cookies";

const AdminDailyWithdraw = () => {
  const allUser = useSelector((state) => state.allUser.data);
  const [condition, setCondition] = useState("pending");
  const [filterUser, setFilterUser] = useState([]);
  let itemsCount = 0;

  const [count, setCount] = useState({
    totalPending: 0,
    totalApprove: 0,
  });

  let penging = false;

  useEffect(() => { 

    if (allUser && allUser.length > 0) {
      let totalPending = 0;
      let totalApprove = 0;
      const currentCount = { ...count };

      allUser.map((user) => {
        user.dailyWithdroawHistory?.map((item) => {
          if (item) {
            if (item.approve) {
              totalApprove = totalApprove + 1;
              currentCount.totalApprove = totalApprove;
              setCount(currentCount);
            }
            if (!item.approve) {
              totalPending = totalPending + 1;
              currentCount.totalPending = totalPending;
              setCount(currentCount);
            }
          }
        });
      });
    }
  }, [allUser]);

  useEffect(() => {
    if (allUser && allUser.length > 0) {
      if (condition === "approved") {
        const array = [];
        allUser.map((user) => {
          if (user?.dailyWithdroawHistory?.length > 0) {
            user?.dailyWithdroawHistory?.map((item) => {
              if (item.approve) {
                array.push(item);
                setFilterUser(array);
              }
            });
          } else {
            setFilterUser(array);
          }
        });
      } else if (condition === "pending") {
        const array = [];
        allUser.map((user) => { 
          if (user?.dailyWithdroawHistory?.length > 0) {
            user?.dailyWithdroawHistory?.map((item) => {
              if (!item.approve) {
                array.push(item);
                setFilterUser(array);
              }
            });
          } else {
            setFilterUser(array);
          }
        });
      }
    }
  }, [condition, allUser]);

 

  const withdrawRequestApproval = (
    e,
    userID,
    requestID,
    dailyPoints,
    dailyPointCharge,
    accessPointCharge
  ) => {
    if (penging) {
      failed(`Wait, Your Previous Request are Porcessing !`);
    }
    if (
      !penging &&
      userID &&
      requestID &&
      dailyPoints &&
      dailyPointCharge &&
      accessPointCharge
    ) {
      penging = true;
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/daily_withdraw_approve`, {
        method: "POST",
        body: JSON.stringify({
          userID,
          requestID,
          dailyPoints,
          dailyPointCharge,
          accessPointCharge,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          penging = false;
          if (data.sucess) {
            e.target.parentNode.parentNode.style.display = "none";
            sucess(data.sucess);
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
    }
  };
  const withdrawRequestDecline = (e, userID, requestID) => {
    if (penging) {
      failed(`Wait, Your Previous Request are Porcessing !`);
    }
    if (!penging && userID && requestID) {
      penging = true;

      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/daily_withdraw_decline`, {
        method: "POST",
        body: JSON.stringify({
          userID,
          requestID,
        }),
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => { 
          penging = false;
          if (data.sucess) {
            e.target.parentNode.parentNode.style.display = "none";
            sucess(data.sucess);
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
    }
  };
  return (
    <section >
      <div>
        <h3 className="main-title">Daily Withdraw Request</h3>
      </div>
      <div className=" genaration ">
        <div>
          <h4>Total Withdraw Request Summary</h4>
        </div>
        <div className="d-flex">
          <p>Total Pending :</p>
          <p className="ps-3">{count.totalPending}</p>
        </div>
        <div className="d-flex">
          <p>Total Approved :</p>
          <p className="ps-3">{count.totalApprove}</p>
        </div>
        <div className="d-flex">
          <p>Total Request :</p>
          <p className="ps-3">{count.totalApprove + count.totalPending}</p>
        </div>
      </div>
      <div className="common-table-style">
        <div className="d-flex align-items-center">
          <h4>Daily Withdraw Request History</h4>
        </div>
        <div className="select-input-common-style sub-generation">
          <h4 className="me-2">Select User</h4>
          <select
            name="porvider"
            id="porvider"
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="pending">Pending User</option>
            <option value="approved">Approved User</option>
            <option value="all">
              <h4>All User</h4>
            </option>
          </select>
          <FaAngleDoubleDown
            className="table-collaps-icon"
            id="collaps-icon"
            onClick={tableCollaps}
          />
        </div>
        <div
          className="active-common-table-container common-table-container"
          id="table-container"
        >
          {allUser && allUser.length > 0 ? (
            <>
              <div className="scroll-text">
                <p>scroll it</p>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      {condition === "all" && <td>User Name</td>}
                      <td>User ID</td>
                      <th>Payment Method</th>
                      <th>Phone Number</th>
                      <th>Ammount of Daily Points</th>
                      <th>Ammount of TK</th>
                      <th>Request Status</th>
                      <th>Transfer Date</th>
                      {condition === "pending" && <th colSpan="2">Option</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {allUser?.length > 0 &&
                      condition === "all" &&
                      allUser.map((user, index) => {
                        return user?.dailyWithdroawHistory?.map((items) => {

                          itemsCount = itemsCount + 1;
                          return (
                            <tr key={items.requestID}>
                              <td>{itemsCount}</td>
                              <td className="table-name">{user.fullName}</td>
                              <td>{items.userID}</td>
                              <td>{items.receiveBy}</td>
                              <td>{items.phoneNumber}</td>
                              <td>{items.amountOfPoints} Points</td>
                              <td>{items.amountOfTk} Tk</td>
                              <td>{items.approve ? "Approved" : "Pending"}</td>
                              <td className="table-date">
                                {items.requestDate}
                              </td>
                            </tr>
                          );
                        });
                      })}
                    {filterUser &&
                      filterUser.length > 0 &&
                      condition !== "all" &&
                      filterUser.map((items) => {
                        itemsCount = itemsCount + 1;
                        return (
                          <tr key={items.requestID}>
                            {/* <tr key={items.requestID}> */}
                            <td>{itemsCount}</td>
                            {/* <td className="table-name">{user.fullName}</td> */}
                            <td>{items.userID}</td>
                            <td>{items.receiveBy}</td>
                            <td>{items.phoneNumber}</td>

                            <td>{items.amountOfPoints} Points</td>

                            <td>{items.amountOfTk} Tk</td>
                            <td>{items.approve ? "Approved" : "Pending"}</td>
                            <td className="table-date">{items.requestDate}</td>
                            {!items?.approve && (
                              <td className="collSpan_icons collspan_check_icon">
                                <img
                                  src={checkIcon}
                                  alt="_image"
                                  onClick={(e) =>
                                    withdrawRequestApproval(
                                      e,
                                      items.userID,
                                      items.requestID,
                                      items.amountOfPoints,
                                      items.dailyPointCharge,
                                      items.accessPointCharge
                                    )
                                  }
                                />
                              </td>
                            )}
                            {!items?.approve && (
                              <td className="collSpan_icons collspan_delete_icon">
                                <img
                                  src={deleteIcon}
                                  alt="_image"
                                  onClick={(e) =>
                                    withdrawRequestDecline(
                                      e,
                                      items.userID,
                                      items.requestID
                                    )
                                  }
                                />
                              </td>
                            )}
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="no-history">
              <p>Your have no User Yet !</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AdminDailyWithdraw;

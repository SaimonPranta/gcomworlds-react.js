import React, { useEffect, useState } from "react";
import "./AdminNewRequest.css";
import proImg from "../../../Assets/Images/profile/avatar1.jpg";
import { getCookie } from "../../../Hooks/cookies";
import failed from "../../../Shades/Toastes/failed";
import sucess from "../../../Shades/Toastes/sucess";

const AdminNewRequest = () => {
  const [pendingUser, setPendingUser] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/pending-user`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.data) {
          setPendingUser(data.data);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }, []);

  const handleApprove = (id) => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin/approve_request/${id}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${getCookie()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.sucess) {
          const filterUser = pendingUser.filter((user) => id !== user._id);
          setPendingUser(filterUser);
          sucess(data.sucess);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };
  const handleDelete = (id) => {
    console.log(id);
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/admin/delete_request/${id}`,
      {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${getCookie()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.sucess) {
          const filterUser = pendingUser.filter((user) => id !== user._id);
          setPendingUser(filterUser);
          sucess(data.sucess);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }; 
  return (
    <div className="new-request  mt-4">
      <div>
        <h4>New pending user</h4>
      </div>
      <div className="pending-user-container">
        {pendingUser.length > 0 ? (
          pendingUser.map((item, index) => {
            return (
              <div className="inner-container" key={index}>
                <div className="person-info">
                  <img src={proImg} alt="" />
                  <div className="action">
                    <button onClick={() => handleApprove(item._id)}>
                      Approve
                    </button>
                    <button onClick={() => handleDelete(item._id)}>
                      Delete
                    </button>
                  </div>
                </div>
                <div className="payment-info">
                  <div>
                    <h6>{item.fullName}</h6>
                    {item.accountType && (
                      <p>Account Type: {item.accountType}</p>
                    )}
                    {item.referID && <p>Refer ID: {item.referID}</p>}
                    {item.placementID && (
                      <p>Placement ID: {item.placementID}</p>
                    )}
                    <p>Acount Status: Unactive</p>
                    <p className="date">Join Date: {item.joinDate}</p>
                  </div>

                  {item?.packages?.length > 0 && (
                    <div>
                      <p>Payment Method: {item.packages[0].paymentMehod}</p>
                      {item.packages[0].porvider && (
                        <p>Provider: {item.packages[0].porvider}</p>
                      )}

                      {item.packages[0].mobileBankNumber && (
                        <p>
                          MobileBank Number: {item.packages[0].mobileBankNumber}
                        </p>
                      )}

                      {item.packages[0].transitionID && (
                        <p>Payment: {item.packages[0].transitionID}</p>
                      )}
                      {item.packages[0].totalAmountOfTk && (
                        <p>Amount: {item.packages[0].totalAmountOfTk} tk</p>
                      )}
                      {item.packages[0].productCode && (
                        <p>Product Code: {item.packages[0].productCode}</p>
                      )}
                      {item.packages[0].mobileNumber && (
                        <p>Mobile Number: {item.packages[0].mobileNumber}</p>
                      )}
                      {item.packages[0].olduserID && (
                        <p>Created By UserID: {item.packages[0].olduserID}</p>
                      )}
                      {item.packages[0].accessPoints && (
                        <p>
                          Payed Access Point: {item.packages[0].accessPoints}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="not-task">
            <p>
              There Is No Request Yet <strong>!</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminNewRequest;

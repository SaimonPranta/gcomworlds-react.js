import React, { useEffect, useState } from "react";
import myimg from "../../../Assets/Images/profile/avatar1.jpg";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSnapchatGhost } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { useParams } from "react-router-dom";
import { getCookie } from "../../../Hooks/cookies";
import Loading from "../../../Shades/Loading/Loading";

const ViewProfile = () => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);

  const [count, setCount] = useState({
    approveInvestment: 0,
    approveWithdraw: 0,
  });
  const { id } = useParams();

  useEffect(() => {
    if (getCookie()) {
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/admin/view_profile/${id}`, {
        method: "GET",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
            setLoading(false)
          if (data.data) {
            data.data.password = null;
            setUser(data.data);
          }
        });
    }
  }, []);

  useEffect(() => {
    if (user?._id) {
      let approveInvestment = 0;
      let approveWithdraw = 0;

      user.investment.map((req) => {
        const currentCount = { ...count };
        if (req.apporoval) {
          approveInvestment = approveInvestment + req.amount;
          currentCount["approveInvestment"] = approveInvestment;
          setCount(currentCount);
        }
      });

      user.withdrawInfo.map((req) => {
        const currentCount = { ...count };
        if (req.apporoval) {
          approveWithdraw = approveWithdraw + req.amount;
          currentCount["approveWithdraw"] = approveWithdraw;
          setCount(currentCount);
        }
      });
    }
  }, []);

  return (
    <section className="profile ">
      <div className="d-flex align-items-center">
        <h3 className="main-title">Profile</h3>
      </div>
      <div className=" porfile-sub-container">
        <div className="porfile-common-section ">
          <div className="img-conatiner">
            <img
              src={
                user?.img
                  ? `${process.env.REACT_APP_SERVER_HOST_URL}/${user.img}`
                  : myimg
              }
              alt=""
            />
          </div>
          <div className="user-name">
            <h2>{user?.fullName && user.fullName} </h2>
            <p>{user.isActive ? "Active User" : "Unactive User"}</p>

            <div>
              <a href="">
                <FaFacebookF />
              </a>
              <a href="">
                <FaTwitter />
              </a>
              <a href="">
                <AiFillInstagram />
              </a>
              <a href="">
                <FaSnapchatGhost />
              </a>
              <a href="">
                <IoLogoWhatsapp />
              </a>
            </div>
          </div>
        </div>
        <div className=" porfile-common-section p-4">
          <div className="about">
            <h4>Profile Details </h4>

            <p>
              <span>Full Name</span>:
              <strong>{user?.fullName && user.fullName}</strong>
            </p>
            <p>
              <span>Father Name</span>:{user?.fatherName && user.fatherName}
            </p>
            <p>
              <span>Mother Name</span>:{user?.motherName && user.motherName}
            </p>
            <p>
              <span>Account Status</span>:
              {user?.isActive ? "Active" : "Unactive"}
            </p>
            <p>
              <span>NID</span>:{user?.nid && user.nid}
            </p>
            <p>
              <span>Phone Number</span> :{" "}
              {user?.phoneNumber && user.phoneNumber}
            </p>
            <p>
              <span>Email</span> : {user?.email && user.email}
            </p>
            <p>
              <span>User ID</span> :{user?.userID && user.userID}
            </p>
            <p>
              <span>Reference ID</span> : {user?.referID && user.referID}
            </p>
            <p>
              <span>Placement ID</span> :{" "}
              {user?.placementID ? user.placementID : "None"}
            </p>
            <p>{/* <span>Total Member</span> : {totalUser} person */}</p>
            <p>
              <span>Rank</span> : {user?.rank ? user.rank : "No Rank"}
            </p>
            <p>
              <span>Registration Date</span> : {user?.joinDate && user.joinDate}
            </p>
          </div>
        </div>
        <div className=" porfile-common-section balance-container p-4">
          <div className="balance">
            <h4>Points</h4>
            <div className="sub-balance">
              <div>
                <span>{user?.accessPoints ? user.accessPoints : 0} points</span>
                <p>Access</p>
              </div>
              <div>
                <span>{user?.dailyPoints ? user.dailyPoints : 0} points</span>
                <p>Daily</p>
              </div>
              <div>
                <span>
                  {user?.regularPoints ? user.regularPoints : 0} points
                </span>
                <p> Regular</p>
              </div>
              <div>
                <span>
                  {user?.accessPoints + user?.dailyPoints + user?.regularPoints}{" "}
                  points
                </span>
                <p>Total</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </section>
  );
};

export default ViewProfile;

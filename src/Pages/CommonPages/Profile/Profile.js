import React, { useContext, useEffect, useState } from "react";
import "./Profile.css";
import myimg from "../../../Assets/Images/profile/avatar1.jpg";

import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { FaSnapchatGhost } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

import camera from "../../../Assets/Images/Icons/camera.png";
import editIcon from "../../../Assets/Images/Icons/edit (2).png";
import { ToastContainer } from "react-toastify";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import EditProfileModel from "../../../Models/EditProfileModel/EditProfileModel";
import { addModel } from "../../../Hooks/handleModel";
import ResetPasswordModel from "../../../Models/ResetPasswordModel/ResetPasswordModel";
import ChangeProfilePicModel from "../../../Models/ChangeProfilePicModel/ChangeProfilePicModel";

const Profile = () => {
  const user = useSelector((state) => state.user.data);

  const [count, setCount] = useState({
    approveInvestment: 0,
    approveWithdraw: 0,
  });

  useEffect(() => {
    if (user?._id) {
      let approveInvestment = 0;
      let approveWithdraw = 0;

      user?.investment?.map((req) => {
        const currentCount = { ...count };
        if (req.apporoval) {
          approveInvestment = approveInvestment + req.amount;
          currentCount["approveInvestment"] = approveInvestment;
          setCount(currentCount);
        }
      });

      user?.withdrawInfo?.map((req) => {
        const currentCount = { ...count };
        if (req.apporoval) {
          approveWithdraw = approveWithdraw + req.amount;
          currentCount["approveWithdraw"] = approveWithdraw;
          setCount(currentCount);
        }
      });
    }
  }, []);

  const copyText = () => {
    const copyBtn = document.getElementById("refer-link-input");
    copyBtn.select();
    document.execCommand("copy");
    // sucess("Copied");
  };

  const hangleEditMenu = () => {
    const porfile_menu = document.getElementById("porfile_menu");

    porfile_menu.classList.toggle("active_porfile_menu");
  };

  return (
    <section className="profile text-black">
      <div className="profile-title  d-flex align-items-center">
        <h3 className="main-title">Profile</h3>
        <div
          className="edit_icon d-flex align-items-center justify-content-center ms-4 mb-lg-4 "
          id="edit_icon"
          onClick={hangleEditMenu}
        >
          <img src={editIcon} alt="edit" />
          <p className="pt-1 ">Edit</p>
          <div className="porfile_menu light-shdow" id="porfile_menu">
            <p
              onClick={() =>
                addModel("edit-profile-model", "active-edit-profile-model")
              }
            >
              Edit Profile
            </p>
            <p
              onClick={() =>
                addModel("reset-password-model", "active-reset-password-model")
              }
            >
              Reset Password
            </p>
          </div>
        </div>
      </div>
      {!user.isActive && user.balance < 50 && (
        <div className="activation-secton">
          <p>
            Your account aren't Active, to active your account you need to
            invest minimum 50 TK !{" "}
            <NavLink to="/dashboard/investment">Invest Now</NavLink>
          </p>
        </div>
      )}
      {!user.isActive && user.balance >= 50 && (
        <div className="activation-secton">
          <p>
            Your account aren't Active, to active your account click acive now !{" "}
          </p>
        </div>
      )}
      <div className=" porfile-sub-container">
        <div className="porfile-common-section ">
          <div className="img-conatiner">
            <img
              src={
                user?.img
                  ? `${process.env.REACT_APP_SERVER_HOST_URL}/${user.img}`
                  : myimg
              }
              alt="img"
            />
            <img
              src={camera}
              alt="img"
              className="camera_icon"
              id="camera_icon"
              onClick={() =>
                addModel("change-profile-pic", "active-change-profile-pic")
              }
            />
          </div>
          <div className="user-name">
            <h2>{user?.fullName && user.fullName} </h2>
            <p className={user.isActive ? "deactive-user" : "deactive-user"}>
              {user.isActive ? "Active User" : "Unactive User"}
            </p>
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
        <div className="porfile-common-section light-shadow p-4">
          <div className="about">
            <h4>About Me</h4>
            <p>
              {user?.bio && user.bio.length > 50
                ? user.bio
                : `Hello, I'm ${
                    user.firstName + " " + user.lastName
                  }. I'm an investor in this company. I'm here to become a sucessfull persone and make my career.`}
            </p>

            <h4>Profile Details </h4>

            <p>
              <span>Full Name:</span>
              <strong>{user?.fullName && user.fullName}</strong>
            </p>
            <p>
              <span>Father Name:</span>{" "}
              <span>{user?.fatherName && user.fatherName}</span>
            </p>
            <p>
              <span>Mother Name:</span>
              <span>{user?.motherName && user.motherName}</span>
            </p>
            <p>
              <span>Account Status:</span>
              <span>{user?.isActive ? "Active" : "Unactive"}</span>
            </p>
            <p>
              <span>NID:</span>
              <span>{user?.nid && user.nid}</span>
            </p>
            <p>
              <span>Phone Number:</span> {user?.phoneNumber && user.phoneNumber}
            </p>
            <p>
              <span>Email:</span>
              <span>{user?.email && user.email}</span>
            </p>
            <p>
              <span>User ID:</span>
              <span>{user?.userID && user.userID}</span>
            </p>
            <p>
              <span>Reference ID:</span>
              <span>{user?.referID && user.referID}</span>
            </p>
            <p>
              <span>Placement ID:</span>
              <span>{user?.placementID && user.placementID}</span>
            </p>
            <p>{/* <span>Total Member:</span> {totalUser} person */}</p>
            <p>
              <span>Rank:</span>
              <span>{user?.rank ? user.rank : "No Rank"}</span>
            </p>
            <p>
              <span>Registration Date:</span>
              <span>{user?.joinDate && user.joinDate}</span>
            </p>
          </div>
        </div>
        <div className="porfile-common-section balance-container p-4">
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
      <>
        <EditProfileModel user={user} />
        <ResetPasswordModel id={user._id} />
        <ChangeProfilePicModel id={user._id} profilePic={user?.img} />
        <ToastContainer />
      </>
    </section>
  );
};

export default Profile;

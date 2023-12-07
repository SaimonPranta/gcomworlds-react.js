
import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { hideModel } from "../../Hooks/handleModel";
import "./ChangeProfilePicModel.css";
import myimg from "../../Assets/Images/profile/avatar1.jpg";
import failed from "../../Shades/Toastes/failed";
import sucess from "../../Shades/Toastes/sucess";
import { useDispatch } from "react-redux";
import { addUser } from "../../Store/UserSlice/UserSlice";

const ChangeProfilePicModel = ({ id, profilePic }) => {
  const [img, setImg] = useState("");
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const data = e.target.files[0];
    setImg(data);
  };
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!img) {
      return failed("Please select an image then try");
    }
    const formData = new FormData();
    formData.append("image", img);

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/add_image/${id}`, {
      method: "PATCH",
      // headers: { "Content-Type": "application/json" },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          hideModel("change-profile-pic", "active-change-profile-pic");
          dispatch(addUser(data.data))
          sucess("Image updated sucessfull");
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };

  return (
    <div
      className="common-model-style change-profile-pic"
      id="change-profile-pic"
    >
      <div className="inner-container">
        <div className="title-container d-flex justify-content-center py-3">
          <h5>Change Profile Picture</h5>
          <ImCross
            onClick={() =>
              hideModel("change-profile-pic", "active-change-profile-pic")
            }
          />
        </div>
        <form onSubmit={handleFormSubmit}>
          {!img ? (
            <img
              src={profilePic ? `${process.env.REACT_APP_SERVER_HOST_URL}/${profilePic}` : myimg}
              alt=""
            />
          ) : (
            <img src={URL.createObjectURL(img)} alt="" />
          )}

          {/* // <img src={URL.createObjectURL(img)} alt="" />) */}
          <div>
            <label>Select Profile Picture</label>
            <input
              type="file"
              accept="image/*"
              name="img"
              onChange={handleChange}
              required
            />
          </div>
          <div className="d-flex justify-content-center mt-4">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <div
        className="model-blur-bg"
        onClick={() =>
          hideModel("change-profile-pic", "active-change-profile-pic")
        }
      />
    </div>
  );
};

export default ChangeProfilePicModel;

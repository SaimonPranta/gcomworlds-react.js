import React from "react";
import "./EditProfileModel.css";
import { ImCross } from "react-icons/im";
import { useFormik } from "formik";
import { hideModel } from "../../Hooks/handleModel";
import { useDispatch } from "react-redux";
import {addUser} from "../../Store/UserSlice/UserSlice";
import sucess from "../../Shades/Toastes/sucess";
import failed from "../../Shades/Toastes/failed";

const EditProfileModel = ({ user }) => {
const dispatch = useDispatch();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      fullName: user.fullName,
      fatherName: user.fatherName,
      motherName: user.motherName,
      nid: user.nid,
    },
    onSubmit: (values) => {
      if (
        !values.fullName ||
        !values.fatherName ||
        !values.motherName ||
        !values.nid
      ) {
          return  failed("Please fill the full form then try again");
      }
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/update/${user._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            dispatch(addUser(data.data));
            hideModel("edit-profile-model", "active-edit-profile-model");
            sucess("Profile information updated sucessfully")
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
    },
  });

  return (
    <div className="common-model-style" id="edit-profile-model">
      <div className="inner-container">
        <div className="title-container d-flex justify-content-center py-3">
          <h5>Edit Profile</h5>
          <ImCross
            onClick={() =>
              hideModel("edit-profile-model", "active-edit-profile-model")
            }
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Father Name</label>
            <input
              type="text"
              name="fatherName"
              value={values.fatherName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Mother Name</label>
            <input
              type="text"
              name="motherName"
              value={values.motherName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>NID</label>
            <input
              type="text"
              name="nid"
              value={values.nid}
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
          hideModel("edit-profile-model", "active-edit-profile-model")
        }
      />
    </div>
  );
};

export default EditProfileModel;

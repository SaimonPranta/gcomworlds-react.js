import React from "react";
import "./ResetPasswordModel.css";
import { ImCross } from "react-icons/im";
import { hideModel } from "../../Hooks/handleModel";
import { useFormik } from "formik";
import { resetPasswordSchema } from "../../Schemas";
import sucess from "../../Shades/Toastes/sucess"
import failed from "../../Shades/Toastes/failed";

const ResetPasswordModel = ({id}) => {
    const { values, errors, handleChange, handleSubmit } = useFormik({
      initialValues: {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit: (values) => { 
        fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/reset_password/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((res) => res.json())
          .then((data) => { 
            if (data.data) {
              sucess("Password updated sucessfull");
              hideModel("reset-password-model", "active-reset-password-model");
            }
            if (data.failed) {
              failed(data.failed);
            }
          });
      },
    });

  return (
    <div className="common-model-style" id="reset-password-model">
      <div className="inner-container">
        <div className="title-container d-flex justify-content-center py-3">
          <h5>Reset Password</h5>
          <ImCross
            onClick={() =>
              hideModel("reset-password-model", "active-reset-password-model")
            }
          />
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Password</label>
            <input
              type="text"
              name="password"
              value={values.password}
              onChange={handleChange}
              required
            />
          </div>
          {errors.password && <p className="error">{errors.password}</p>}
          <div>
            <label>New Password</label>
            <input
              type="text"
              name="newPassword"
              value={values.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          {errors.newPassword && <p className="error">{errors.newPassword}</p>}

          <div>
            <label>Confirm New Password</label>
            <input
              type="text"
              name="confirmNewPassword"
              value={values.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </div>
          {errors.confirmNewPassword && <p className="error">{errors.confirmNewPassword}</p>}

          <div className="d-flex justify-content-center mt-4">
            <input type="submit" value="Submit" />
          </div>
        </form>
      </div>
      <div
        className="model-blur-bg"
        onClick={() =>
          hideModel("reset-password-model", "active-reset-password-model")
        }
      />
    </div>
  );
};

export default ResetPasswordModel;

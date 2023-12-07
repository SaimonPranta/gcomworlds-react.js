import React, { useEffect, useState } from "react";
import "./style.css";
import { ToastContainer } from "react-toastify";
import countryList from "react-select-country-list";
import { Link,  useNavigate } from "react-router-dom";
import OtpValidation from "../components/OtpValidation/index.js";
import {
  handleFormSubmit,
  handleOtpVerification,
} from "../components/OtpValidation/controllers";
import { buyerFormKeys } from "../helper/constants/keySchema";
import { errorMessage } from "../helper/constants/errorMessage";
import {
  nameValidator,
  numberValidator,
} from "../helper/controllers/validator";
import failed from "../../../../Shades/Toastes/failed";
import sucess from "../../../../Shades/Toastes/sucess";
import { setCookie } from "../../../../Hooks/cookies";
import { addUser } from "../../../../Store/UserSlice/UserSlice";
import { useDispatch } from "react-redux";

const Index = () => {
  const [error, setError] = useState({});
  const [input, setInput] = useState({
    accountType: "seller",
    gender: "male",
    country: "Bangladesh",
  });
  const [condition, setCondition] = useState({
    showOtp: false,
    enableOtpBtn: false,
  });

  const dispatchEvent = useDispatch();
  const navigate = useNavigate();


  const setErrorMessage = (name, customMessage, isContinue) => {
    if (isContinue && !customMessage) {
      return setError((state) => {
        delete state[name];
        console.log("state ==>", state);
        return {
          ...state,
        };
      });
    }
    setError((state) => {
      return {
        ...state,
        [name]: customMessage ? customMessage : errorMessage[name],
      };
    });
  };

  const setInputValue = (e) => {
    const name = e.target.name;
    const value = e.target.value.replaceAll("  ", " ");
    console.log("name", name);
    console.log("value", value);

    setInput((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const submitFormVerification = () => {
    const errorList = buyerFormKeys.filter((key) => {
      const value = input[key];
      console.log(value);

      if (!value || value.length < 1) {
        setError((state) => {
          return {
            ...state,
            [key]: errorMessage[key],
          };
        });
        return true;
      }
      if (
        key === "confirmPassword" &&
        input.password !== input.confirmPassword
      ) {
        return setError((state) => {
          return {
            ...state,
            [key]: "Confirm password should match with password",
          };
        });
      }
      setError((state) => {
        delete state[key];
        return {
          ...state,
        };
      });
      return false;
    });
    if (errorList.length > 0) {
      return false;
    }
    if (input.password !== input.confirmPassword) {
      return false;
    }
    return true;
  };
  const registrationSubmit = () => {
    setCondition((state) => {
      return {
        ...state,
        enableOtpBtn: true,
      };
    });
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/seller-registration`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...input,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result from response", result);
        setCondition((state) => {
          return {
            ...state,
            enableOtpBtn: false,
          };
        });

        if (result?.token) {
          setCookie("gcom-user-token", result.token);
        }
        if (result?.data) {
        console.log("result from response form if condition", result);

          dispatchEvent(addUser(result.data));
          navigate("/profile", { replace: true });
        }

        if (result?.success) {
          failed(result.message);
        }
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const isContinue = submitFormVerification();
    if (!isContinue) {
      return;
    }
    const successOtpSend = handleFormSubmit(input.phoneNumber);
    if (!successOtpSend) {
      return setError((state) => {
        return {
          ...state,
          phoneNumber: "Invalid phone number, please provide a valid number",
        };
      });
    }

    setCondition((state) => {
      return {
        ...state,
        showOtp: true,
      };
    });
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    let customMessage = false;
    let isContinue = true;

    if (["fullName", "fatherName", "motherName"].includes(name)) {
      isContinue = nameValidator(value);
    } else if (name === "phoneNumber") {
      isContinue = numberValidator(value);
      if (isContinue && value.length !== 11) {
        customMessage = "Phone number should be more or less then 11 digit";
      }
    } else if (name === "confirmPassword" && input.password !== value) {
      customMessage = "Confirm password should be match with password";
    }
    if (!isContinue) {
      return setErrorMessage(name, customMessage, isContinue);
    }
    setErrorMessage(name, customMessage, isContinue);
    setInputValue(e);
  };

  const formOtpSubmit = async (e) => {
    e.preventDefault();
    console.log("input.otp", input.otp);
    if (input.otp.length !== 6) {
      failed("Please provide valid OTP code");
      return true;
    }
    const result = await handleOtpVerification(input.otp);
    console.log("result ==>", result);
    if (!result) {
      failed("Please provide valid OTP code");
      return true;
    }

    registrationSubmit();
  };

  return (
    <section className="authentication ">
      {!condition?.showOtp && (
        <form onSubmit={handleSubmit} autoComplete="off" autoCorrect="off">
          <h6>Register as seller account</h6>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={input.fullName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {error.fullName && <p className="form-error">{error.fullName}</p>}
          <div className="select">
            <label>Gender</label>
            <select name="gender" value={input.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <label>Father Name</label>
          <input
            type="text"
            placeholder="Father Name"
            name="fatherName"
            value={input.fatherName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {error.fatherName && <p className="form-error">{error.fatherName}</p>}

          <label>Mother Name</label>
          <input
            type="text"
            placeholder="Mother Name"
            name="motherName"
            value={input.motherName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {error.motherName && <p className="form-error">{error.motherName}</p>}

          <label>phone Number</label>
          <input
            type="text"
            placeholder="phone Number"
            name="phoneNumber"
            value={input.phoneNumber}
            autoComplete="off"
            onChange={handleChange}
          />
          {error.phoneNumber && (
            <p className="form-error">{error.phoneNumber}</p>
          )}

          <label>User ID</label>
          <input
            type="text"
            placeholder="User Id"
            name="userID"
            value={input.userID}
            autoComplete="off"
            onChange={handleChange}
          />
          {error.userID && <p className="form-error">{error.userID}</p>}
          <label>Refer ID</label>
          <input
            type="text"
            placeholder="User Id"
            name="referID"
            value={input.referID}
            autoComplete="off"
            onChange={handleChange}
          />
          <label>Email Address</label>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={input.email}
            autoComplete="off"
            onChange={handleChange}
          />
          {error.email && <p className="form-error">{error.email}</p>}

          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={input.address}
            autoComplete="off"
            onChange={handleChange}
          />
          {error.address && <p className="form-error">{error.address}</p>}

          <div className="select">
            <label>Country</label>
            <select
              value={input.country}
              name="country"
              onChange={handleChange}
            >
              {countryList().getData() &&
                countryList()
                  .getData()
                  .map((value) => {
                    return (
                      <option value={value.label} key={value.label}>
                        {value.label}
                      </option>
                    );
                  })}
            </select>
            {error.country && <p className="form-error">{error.country}</p>}
          </div>
          {error.placementVolume && (
            <p className="form-error">{error.placementVolume}</p>
          )}
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={input.password}
            autoComplete="off"
            onChange={handleChange}
          />
          {error.password && <p className="form-error">{error.password}</p>}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={input.confirmPassword}
            autoComplete="off"
            onChange={handleChange}
          />
          {error.confirmPassword && (
            <p className="form-error">{error.confirmPassword}</p>
          )}
          <input type="submit" value="Submit" />
          {/* {!btnloading ? (
              
            ) : (
              <ButtonLoading />
            )} */}
          <div className="form-navigation d-flex">
            <p>
              Already have an account?
              <Link to="/login">
                <span>Login</span>
              </Link>
            </p>
          </div>
        </form>
      )}

      {condition.showOtp && (
        <OtpValidation
          input={input}
          handelChange={handleChange}
          formOtpSubmit={formOtpSubmit}
          enableBtn={condition.enableOtpBtn}
        />
      )}
      <div id="sign-in-button" />
      <ToastContainer />
    </section>
  );
};

export default Index;

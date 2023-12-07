import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Login.css";
import { useFormik } from "formik";
import sucess from "../../../Shades/Toastes/sucess";
import failed from "../../../Shades/Toastes/failed";
import { getCookie, setCookie } from "../../../Hooks/cookies";
import { useDispatch } from "react-redux";
import { addUser } from "../../../Store/UserSlice/UserSlice";
import Loading from "../../../Shades/Loading/Loading";
import { ToastContainer } from "react-toastify";
import ButtonLoading from "../../../Models/ButtonLoading/ButtonLoading";
import { authentication } from "../../../Firebase/firebase.config";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const Login = () => {
  const dispatch = useDispatch();
  const [forgottInfo, setForgottInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [btnloading, setBtnLoading] = useState(false);

  const [forgotPassCondition, setForgotPassCondition] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "/";
 

  useEffect(() => {
    if (getCookie()) {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/user/read_user_by_cooki_info`,
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
          setLoading(false);
          if (data.data) {
            dispatch(addUser(data.data));
            navigate(from, { replace: true });
          }
        });
    } else {
      setLoading(false);
    }
  }, []);

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      userID: "",
      password: "",
    },
    onSubmit: (values) => {
      setBtnLoading(true);
      fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      })
        .then((res) => res.json())
        .then((data) => {
          setBtnLoading(false);

          console.log(data);
          if (data.data) {
            sucess("Login sucessfull");
            setCookie("gcom-user-token", data.token);
            dispatch(addUser(data.data));
            navigate(from, { replace: true });
          }
          if (data.failed) {
            failed(data.failed);
          }
        });
    },
  });

  const handleForgotPassword = () => {
    let currntCondition = { ...forgotPassCondition };
    currntCondition["forgotPassword"] = true;
    setForgotPassCondition(currntCondition);
  };
  const handleCheckForgotPhoneNumber = (e) => {
    e.preventDefault();
    if (!forgottInfo.userID) {
      return;
    }
    setBtnLoading(true);
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/public/is_user_exist/${forgottInfo.userID}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          console.log(data.data);
          const info = { ...forgottInfo };
          let currntCondition = { ...forgotPassCondition };
          forgottInfo["phoneNumber"] = data.data.phoneNumber;
          info["phoneNumber"] = data.data.phoneNumber;
          setForgottInfo(info);
          currntCondition["isNumberExist"] = true;
          setForgotPassCondition(currntCondition);
          window.recaptchaVerifier = new RecaptchaVerifier(
            "sign-in-button",
            {
              size: "invisible",
              callback: (response) => {},
            },
            authentication
          );
          varifierFunction();
        }
        if (data.failed) {
          setBtnLoading(false);

          const info = { ...forgottInfo };
          info["phoneNumber"] = "";
          setForgottInfo(info);
          failed(data.failed);
        }
      });
  };
  console.log(forgottInfo);
  const handleNewPassword = (e) => {
    e.preventDefault();
    setBtnLoading(true);

    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/public/forgot_password`, {
      method: "POST",
      body: JSON.stringify(forgottInfo),
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setBtnLoading(false);

        if (data.data) {
          data.data.password = null;
          dispatch(addUser(data.data));
          navigate(from, { replace: true });
          sucess("Password reset Sucessfull");
        }
        if (data && data.token) {
          setCookie("gcom-user-token", data.token);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };
  const varifierFunction = () => {
    const phoneNumber = forgottInfo.phoneNumber;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setBtnLoading(false);
      })
      .catch((error) => {
        setBtnLoading(false);

        console.log(error);

        const humanCheckerDiv = document.getElementById("sign-in-button");
        humanCheckerDiv.remove();
        failed("You porved Phone Number are invalid !");
      });
  };

  const handleVarification = (e) => {
    e.preventDefault();

    if (forgottInfo.otp.length !== 6) {
      return failed("Please provide valid OTP");
    }
    setBtnLoading(true);

    let confirmationResult = window.confirmationResult;
    confirmationResult
      .confirm(forgottInfo.otp)
      .then((result) => {
        setBtnLoading(false);

        console.log(result);
        const info = { ...forgotPassCondition };
        info["validPhoneNumber"] = true;
        setForgotPassCondition(info);
      })
      .catch((error) => {
        setBtnLoading(false);

        failed(
          "You are Providing a Wrond OTP Code or Your OTP Code are Expired "
        );
      });
  };
  const fongotInputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    const info = { ...forgottInfo };
    info[name] = value;
    setForgottInfo(info);
  };

  return (
    <section className="authentication m-auto">
      {!forgotPassCondition.forgotPassword ? (
        <form onSubmit={handleSubmit} autoComplete="off">
          <h6>Login</h6>
          <label>User ID</label>
          <input
            type="text"
            name="userID"
            placeholder="User ID"
            value={values.userID}
            required
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.userID && <p className="form-error">{errors.userID}</p>}
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            required
            autoComplete="off"
            onChange={handleChange}
          />
          {errors.password && <p className="form-error">{errors.password}</p>}
          {!btnloading ? (
            <input type="submit" value="Login" required autoComplete="off" />
          ) : (
            <ButtonLoading />
          )}

          <div className="form-navigation d-flex">
            <p>
              Don't have an account?
              <Link to="/registaion">
                <span>Register an account</span>
              </Link>
            </p>
          </div>
          <div className="form-navigation d-flex">
            <span onClick={handleForgotPassword}>Forgotten Password?</span>
          </div>
          <div id="sign-in-button"></div>
        </form>
      ) : (
        <>
          {forgotPassCondition.forgotPassword &&
            !forgotPassCondition.validPhoneNumber && (
              <form autoComplete="off" id="logIn_form">
                {!forgotPassCondition.isNumberExist ? (
                  <>
                    <h6>Enter Your User ID</h6>
                    <input
                      type="text"
                      name="userID"
                      placeholder="User ID"
                      value={forgottInfo.userID ? forgottInfo.userID : ""}
                      required
                      autoComplete="off"
                      onChange={fongotInputHandler}
                    />
                    {!btnloading ? (
                      <input
                        type="submit"
                        value="Submit"
                        required
                        autoComplete="off"
                        onClick={handleCheckForgotPhoneNumber}
                      />
                    ) : (
                      <ButtonLoading />
                    )}
                  </>
                ) : (
                  <>
                    <h6>Validate OTP</h6>
                    <label
                      style={{
                        fontSize: ".9rem",
                        fontWeight: "100",
                        color: "#de902a",
                      }}
                    >
                      Please enter the OTP (one time password) to verify your
                      account. A Code has been sent to 01****
                      {forgottInfo.phoneNumber &&
                        forgottInfo.phoneNumber.substring(6)}
                    </label>
                    <label>Enter 6 digit code</label>
                    <input
                      type="text"
                      placeholder="OTP code"
                      name="otp"
                      value={forgottInfo.otp ? forgottInfo.otp : ""}
                      required
                      autoComplete="off"
                      onChange={fongotInputHandler}
                    />
                    {!btnloading ? (
                      <input
                        type="submit"
                        value="Verify"
                        onClick={handleVarification}
                      />
                    ) : (
                      <ButtonLoading />
                    )}
                  </>
                )}

                <div id="sign-in-button"></div>
                {/* <div className='form-navigation d-flex'><p>Didn't get the code? <a onClick={resendFunction} style={{cursor:"pointer"}}><span>Resend it</span></a></p></div> */}
              </form>
            )}

          {forgotPassCondition.validPhoneNumber && (
            <form
              onSubmit={handleNewPassword}
              autoComplete="off"
              autoCorrect="off"
            >
              <h6>Set New Password</h6>
              <input
                type="password"
                placeholder="New Password"
                name="newPassword"
                value={forgottInfo.newPassword ? forgottInfo.newPassword : ""}
                required
                autoComplete="off"
                onChange={fongotInputHandler}
              />

              {!btnloading ? (
                <input type="submit" value="Submit" />
              ) : (
                <ButtonLoading />
              )}
            </form>
          )}
        </>
      )}
      {loading && <Loading />}
      <ToastContainer />
    </section>
  );
};

export default Login;

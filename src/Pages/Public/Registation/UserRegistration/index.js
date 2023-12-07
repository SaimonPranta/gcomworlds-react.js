import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import countryList from "react-select-country-list";
import { useFormik } from "formik";
import { singUpSchema } from "../../../../Schemas";
import { BiUserCircle } from "react-icons/bi";
import sucess from "../../../../Shades/Toastes/sucess";
import failed from "../../../../Shades/Toastes/failed";
import SelectProduct from "./SelectProduct/SelectProduct";
import { setCookie } from "../../../../Hooks/cookies";
import { authentication } from "../../../../Firebase/firebase.config";

import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser } from "../../../../Store/UserSlice/UserSlice";
import ButtonLoading from "../../../../Models/ButtonLoading/ButtonLoading";
import { setLoading } from "../../../../Store/LoadingSlice/LoadingSlice";

const initialFormValue = {
  fullName: "",
  fatherName: "",
  motherName: "",
  gender: "male",
  phoneNumber: "",
  userID: "",
  placementID: "",
  email: "",
  address: "",
  country: "Bangladesh",
  nid: "",
  referID: "",
  password: "",
  confirmPassword: "",
};

const Registation = () => {
  const [errorContainer, setErrorContainer] = useState({});
  const [valuesContainer, setValuesContainer] = useState({});
  const [btnloading, setBtnLoading] = useState(false);
  const [condition, setCondition] = useState({
    stapOne: true,
  });
  const [paymentMehod, setPaymentMehod] = useState("mobileBnking");

  const [user] = useState({});
  const [placemantIDs, setPlacemantIDs] = useState([]);

  const [processing, setProcessing] = useState(false);
  const [value, setValue] = useState("");
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state ? location.state.from.pathname : "/";
  const dispatch = useDispatch();

  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: initialFormValue,
    validationSchema: singUpSchema,
    onSubmit: (values) => {
      // console.log(values);
      setBtnLoading(true);
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/user/registation/data_verification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setBtnLoading(false);

          console.log(data);
          if (data?.sucess) {
            setCondition({ stapTwo: true });
            sucess("First Step Done");
          }
          if (data?.failed) {
            failed(data.failed);
          }
        });
    },
  });
  useEffect(() => {
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/packages/all`)
      .then((res) => res.json())
      .then((data) => {
        if (data.data) {
          setPackages(data.data);
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  }, []);

  useEffect(() => {
    setErrorContainer(errors);
  }, [errors]);
  useEffect(() => {
    setValuesContainer(values);
  }, [values]);

  const handlePlacementID = (e) => {
    const value = values.referID;
    if (value) {
      fetch(
        `${process.env.REACT_APP_SERVER_HOST_URL}/public/get_placement_id/${value}`
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setPlacemantIDs(data.data);
          }
        });
    }
  };
  const handlePlacementInputID = (e) => {
    if (values.referID) {
      handleChange(e, "placementID");
      errors.placementID = "";
    } else {
      errors.placementID =
        "Sorry, you con't set placement ID before set Referral ID";
      values.placementID = "";
      console.log(errors);
    }
  };
  const handleSelectPlacementID = (value) => {
    values.placementID = value;
    errors.placementID = "";
    handleChange("placementID", "placementID");
    console.log(values);
  };

  const handleSelectProduct = (productID) => {
    const currentInfo = { ...valuesContainer };
    currentInfo["productID"] = productID;
    setValuesContainer(currentInfo);
  };

  const handleInput = (e) => {
    const info = { ...valuesContainer };
    const value = e.target.value;
    const name = e.target.name;

    if (typeof info[paymentMehod] !== "object") {
      info[paymentMehod] = {};
    }
    console.log(info[paymentMehod]);

    info[paymentMehod][name] = value;
    setValuesContainer(info);
  };
  const handleOtpInput = (e) => {
    const info = { ...valuesContainer };
    const value = e.target.value;
    const name = e.target.name;
    info[name] = value;
    setValuesContainer(info);
  };

  const handleSubmitProductForm = (e) => {
    e.preventDefault();

    if (!valuesContainer.productID) {
      return failed("Please select your Packge and then try to submit");
    }
    setCondition({ stapThree: true });
    sucess("Step Two Done");
  };
  useEffect(() => {
    user._id && navigate(from, { replace: true });
  }, [user]);

  const varifierFunction = () => {
    const phoneNumber = "+88" + valuesContainer.phoneNumber;
    const appVerifier = window.recaptchaVerifier;

    signInWithPhoneNumber(authentication, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        setLoading(false);

        console.log("confirmationResult", confirmationResult);

        window.confirmationResult = confirmationResult;
        // setProcessing(false);
        setCondition({ stapFour: true });
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);

        const humanCheckerDiv = document.getElementById("sign-in-button");
        humanCheckerDiv.remove();
        // setProcessing(false);
        setCondition({
          stapOne: true,
        });
        failed("You porved Phone Number are invalid !");
      });
  };

  const handleMobileNumberVerification = (e) => {
    e.preventDefault();
    console.log(
      document.getElementById("provider").value,
      valuesContainer.mobileBnking
    );

    if (
      !valuesContainer?.mobileBnking?.provider &&
      document.getElementById("provider")
    ) {
      if (!valuesContainer?.mobileBnking) { 
        valuesContainer["mobileBnking"] = {
          provider: document.getElementById("provider").value,
        };
      } else {
        valuesContainer["mobileBnking"] = {
          ...valuesContainer.mobileBnking,
          provider: document.getElementById("provider").value,
        };
      }
    } 
    setLoading(true);
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
    varifierFunction();
  };

  const handleVarification = (e) => {
    e.preventDefault();

    if (!processing && valuesContainer.otp.length === 6) {
      setProcessing(true);

      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(valuesContainer.otp)
        .then((result) => {
          console.log("result", result);
          const userPhoneNumber = result.user.phoneNumber;
          valuesContainer["phoneNumber"] = userPhoneNumber;
          console.log("userPhoneNumber", userPhoneNumber);

          console.log(valuesContainer);
          setBtnLoading(true);

          fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/user/registation`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...valuesContainer,
              paymentMehod,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              setBtnLoading(false);

              console.log(data);
              if (data?.sucess) {
                sucess(data.sucess);
              }
              if (data?.token) {
                setCookie("gcom-user-token", data.token);
              }
              if (data?.data) {
                dispatch(addUser(data.data));
                navigate(from, { replace: true });
              }

              if (data?.failed) {
                failed(data.failed);
              }
            });
          if (userPhoneNumber) {
            valuesContainer["phoneNumber"] = userPhoneNumber;
          } else {
            // failed("Something is Worong Please try Again !");
          }
        })
        .catch((error) => {
          setBtnLoading(false);
          console.log("error", error);

          failed(
            "You are Providing a Wrond OTP Code or Your OTP Code are Expired "
          );
        });
    } else {
      // failed("You are Providing a Wrond OTP Code OTP !");
    }
  };
  const changeHandler = (value) => {
    setValue(value);
  };
  const handleSelectPlacemetn = (value) => {
    console.log(value);
    if (value === "--Select Volume--") {
      values["placementVolume"] = "";
      return (errors["placementVolume"] =
        "Please Select your Placement Volume");
    }
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/public/select_placement_volume/${value}?placementID=${values.placementID}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (value === "Volume A") {
          if (!data.voliomA) {
            failed("Sorry, Your selected Placement Volume isn't empty");
          }
        }
        if (value === "Volume B") {
          if (!data.voliomB) {
            failed("Sorry, Your selected Placement Volume isn't empty");
          }
        }
      });
  };

  return (
    <section className="authentication ">
      {condition.stapOne && (
        <form onSubmit={handleSubmit} autoComplete="off" autoCorrect="off">
          <h6>Register as regular account</h6>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Full Name"
            name="fullName"
            value={values.fullName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {errorContainer.fullName && (
            <p className="form-error">{errorContainer.fullName}</p>
          )}
          <div className="select">
            <label>Gender</label>
            <select name="gender" value={values.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <label>Father Name</label>
          <input
            type="text"
            placeholder="Father Name"
            name="fatherName"
            value={values.fatherName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {errorContainer.fatherName && (
            <p className="form-error">{errorContainer.fatherName}</p>
          )}

          <label>Mother Name</label>
          <input
            type="text"
            placeholder="Mother Name"
            name="motherName"
            value={values.motherName}
            autoComplete="off"
            style={{ textTransform: "capitalize" }}
            onChange={handleChange}
          />
          {errorContainer.motherName && (
            <p className="form-error">{errorContainer.motherName}</p>
          )}

          <label>phone Number</label>
          <input
            type="text"
            placeholder="phone Number"
            name="phoneNumber"
            value={values.phoneNumber}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.phoneNumber && (
            <p className="form-error">{errorContainer.phoneNumber}</p>
          )}

          <label>User Id</label>
          <input
            type="text"
            placeholder="User Id"
            name="userID"
            value={values.userID}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.userID && (
            <p className="form-error">{errorContainer.userID}</p>
          )}

          <label>Email Address</label>
          <input
            type="text"
            placeholder="Email Address"
            name="email"
            value={values.email}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.email && (
            <p className="form-error">{errorContainer.email}</p>
          )}

          <label>Address</label>
          <input
            type="text"
            placeholder="Address"
            name="address"
            value={values.address}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.address && (
            <p className="form-error">{errorContainer.address}</p>
          )}

          <div className="select">
            <label>Country</label>
            <select
              value={values.country}
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
            {errorContainer.country && (
              <p className="form-error">{errorContainer.country}</p>
            )}
          </div>
          <label>NID</label>
          <input
            type="text"
            placeholder="NID"
            name="nid"
            value={values.nid}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.nid && (
            <p className="form-error">{errorContainer.nid}</p>
          )}
          <label>Referral ID</label>
          <input
            type="text"
            placeholder="Referral ID"
            name="referID"
            value={values.referID}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.referID && (
            <p className="form-error">{errorContainer.referID}</p>
          )}

          <div className="placementID">
            <label>Placement ID</label>
            <input
              type="text"
              placeholder="placement ID"
              name="placementID"
              value={values.placementID}
              autoComplete="off"
              onChange={handleChange}
              // onChange={handlePlacementInputID}
              onFocus={handlePlacementID}
            />
            {errorContainer.placementID && (
              <p className="form-error">{errorContainer.placementID}</p>
            )}
            <div
              className="placement-id-container"
              style={{ display: placemantIDs.length ? "block" : "none" }}
            >
              <h6>Select Placement ID</h6>
              <div>
                {placemantIDs?.length &&
                  placemantIDs.map((user, i) => {
                    return (
                      <button key={i}>
                        <BiUserCircle />
                        <input
                          type="text"
                          name="placementID"
                          value={user?.userID}
                          onClick={handleChange}
                        />
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="select">
            <label>Team</label>
            <select
              name="placementVolume"
              value={values.placementVolume}
              onChange={(e) => {
                handleChange(e);
                handleSelectPlacemetn(e.target.value);
              }}
            >
              <option value={null}>--Select Volume--</option>
              <option value="Volume A">Volume A</option>
              <option value="Volume B">Volume B</option>
            </select>
          </div>
          {errorContainer.placementVolume && (
            <p className="form-error">{errorContainer.placementVolume}</p>
          )}
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={values.password}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.password && (
            <p className="form-error">{errorContainer.password}</p>
          )}

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            value={values.confirmPassword}
            autoComplete="off"
            onChange={handleChange}
          />
          {errorContainer.confirmPassword && (
            <p className="form-error">{errorContainer.confirmPassword}</p>
          )}

          {!btnloading ? (
            <input type="submit" value="Next" />
          ) : (
            <ButtonLoading />
          )}
          <div className="form-navigation d-flex">
            <p>
              Already have an account?
              <Link to="/login">
                <span>Login</span>
              </Link>
            </p>
          </div>
          <div id="sign-in-button"></div> 
        </form>
      )}

      {condition.stapTwo && (
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={handleSubmitProductForm}
        >
          <h6>Register an account</h6>
          <label className="select-product-title">Select Your Packge</label>

          <div className="select-packgae-container">
            {packages?.length > 0 &&
              packages.map((pd) => {
                return (
                  <div onClick={() => handleSelectProduct(pd._id)} key={pd._id}>
                    <SelectProduct product={pd} />
                  </div>
                );
              })}
          </div>
          <input type="submit" value="Next" />

          <div id="sign-in-button"></div> 
        </form>
      )}

      {condition.stapThree && (
        <form
          autoComplete="off"
          autoCorrect="off"
          onSubmit={handleMobileNumberVerification}
          id="registation_form"
        >
          <h6>Select Payment Mehod</h6>
          <div className="radio-container">
            <div>
              <label htmlFor="mobileBanking">Mobile Banking</label>
              <input
                type="radio"
                name="paymentMehod"
                id="activeRedio"
                onChange={(e) => setPaymentMehod(e.target.value)}
                value="mobileBnking"
              />
            </div>
            <div>
              <label htmlFor="cash">Cash Payment</label>
              <input
                type="radio"
                name="paymentMehod"
                value="cashPayment"
                onChange={(e) => setPaymentMehod(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="cash">Access Points</label>
              <input
                type="radio"
                name="paymentMehod"
                value="accessPoint"
                onChange={(e) => setPaymentMehod(e.target.value)}
              />
            </div>
          </div>
          {paymentMehod === "mobileBnking" && (
            <div>
              <div className="select-input-common-style">
                <label>Select Mobile Banking</label>
                <select
                  name="provider"
                  value={
                    valuesContainer?.provider
                      ? valuesContainer.provider
                      : "bKash"
                  }
                  id="provider"
                  onChange={handleInput}
                >
                  <option value="Bkash">bKash</option>
                  <option value="Rocket">Rocket</option>
                  <option value="Nagad">Nagad</option>
                </select>
              </div>
              <label>Mobile Bank Number</label>
              <input
                type="text"
                placeholder="Your Mobile Bank Number"
                name="mobileBankNumber"
                value={
                  valuesContainer?.mobileBnking?.mobileBankNumber
                    ? valuesContainer.mobileBnking.mobileBankNumber
                    : ""
                }
                autoComplete="off"
                onChange={handleInput}
              />
              {errorContainer.mobileBankNumber && (
                <p className="form-error">{errorContainer.mobileBankNumber}</p>
              )}
              <label>Transition ID</label>
              <input
                type="text"
                placeholder="Your Transition ID"
                name="transitionID"
                value={
                  valuesContainer?.mobileBnking?.transitionID
                    ? valuesContainer.mobileBnking.transitionID
                    : ""
                }
                autoComplete="off"
                onChange={handleInput}
              />
              {errorContainer.transitionID && (
                <p className="form-error">{errorContainer.transitionID}</p>
              )}
              <label>Total Amount of Tk</label>
              <input
                type="text"
                placeholder="Total Amount of Tk"
                name="totalAmountOfTk"
                value={
                  valuesContainer?.mobileBnking?.totalAmountOfTk
                    ? valuesContainer.mobileBnking.totalAmountOfTk
                    : ""
                }
                autoComplete="off"
                onChange={handleInput}
              />
              {errorContainer.totalAmountOfTk && (
                <p className="form-error">{errorContainer.totalAmountOfTk}</p>
              )}
            </div>
          )}
          {paymentMehod === "cashPayment" && (
            <div>
              <label>Product Code</label>
              <input
                type="text"
                placeholder="Your Product Code"
                name="productCode"
                value={
                  valuesContainer?.cashPayment?.productCode
                    ? valuesContainer.cashPayment.productCode
                    : ""
                }
                autoComplete="off"
                onChange={handleInput}
              />
              <label>Mobile Number</label>
              <input
                type="text"
                placeholder="Your Mobile Number"
                name="mobileNumber"
                value={
                  valuesContainer?.cashPayment?.mobileNumber
                    ? valuesContainer.cashPayment.mobileNumber
                    : ""
                }
                autoComplete="off"
                onChange={handleInput}
              />
            </div>
          )}
          {paymentMehod === "accessPoint" && (
            <div>
              <label>User ID</label>
              <input
                type="text"
                placeholder="Your User ID"
                name="olduserID"
                value={
                  valuesContainer?.accessPoint?.olduserID
                    ? valuesContainer.accessPoint.olduserID
                    : ""
                }
                autoComplete="off"
                onChange={handleInput}
              />
              <label>Password</label>
              <input
                type="password"
                placeholder="Password"
                name="oldIDPassword"
                value={
                  valuesContainer?.accessPoint?.oldIDPassword
                    ? valuesContainer.accessPoint.oldIDPassword
                    : ""
                }
                autoComplete="off"
                onChange={handleInput}
              />
              <label>Access Points</label>
              <input
                type="text"
                placeholder="Access Points"
                name="accessPoints"
                defaultValue="20"
                autoComplete="off"
              />
            </div>
          )}
          {!btnloading ? (
            <input type="submit" value="Submit" />
          ) : (
            <ButtonLoading />
          )}
          <div id="sign-in-button"></div> 
        </form>
      )}
      {condition.stapFour && (
        <form onSubmit={handleVarification}>
          <h6>Validate OTP</h6>
          <label style={{ fontSize: ".9rem", fontWeight: "100" }}>
            Please enter the OTP (one time password) to verify your account. A
            Code has been sent to 01*****
            {valuesContainer.phoneNumber &&
              valuesContainer.phoneNumber.substring(8)}
          </label>
          <label>Enter 6 digit code</label>
          <input
            type="text"
            placeholder="OTP code"
            name="otp"
            value={valuesContainer.otp ? valuesContainer.otp : ""}
            autoComplete="off"
            onChange={handleOtpInput}
          />
          {!btnloading ? (
            <input type="submit" value="Verify" />
          ) : (
            <ButtonLoading />
          )}
        </form>
      )}
      <ToastContainer />
    </section>
  );
};

export default Registation;

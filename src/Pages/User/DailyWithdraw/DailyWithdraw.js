import React from "react";
import { useState } from "react";
import { FaAngleDoubleDown } from "react-icons/fa";
import failed from "../../../Shades/Toastes/failed";
import sucess from "../../../Shades/Toastes/sucess";
import { addUser } from "../../../Store/UserSlice/UserSlice";
import { tableCollaps } from "../../../Functions/tableCollaps";
import { getCookie } from "../../../Hooks/cookies";
 import ButtonLoading from "../../../Models/ButtonLoading/ButtonLoading.js"
import { ToastContainer } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";

const DailyWithdraw = () => {
  const user = useSelector((state) => state.user.data);
   

  const [loading, setLoading] = useState(false);
  const [withdrawInfo, setwithdrawInfo] = useState({
    porvider: "Bkash",
    withdrawPoints: 100,
  });
  const dispatch = useDispatch();

  const handleInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const currentInfo = { ...withdrawInfo };
    currentInfo[name] = value;
    setwithdrawInfo(currentInfo);
  };
  const formHandle = (e) => {
    e.preventDefault();

    if (
      !withdrawInfo.porvider ||
      !withdrawInfo.withdrawPoints ||
      !withdrawInfo.phoneNumber
    ) {
      return failed("Please fill the full form and then try");
    }
    const dailyPointCharge = Number(withdrawInfo.withdrawPoints) * (10 / 100);
    const totalPoints = dailyPointCharge + Number(withdrawInfo.withdrawPoints);
    const accessPointCharge = Number(withdrawInfo.withdrawPoints) * (2 / 100);
    if (user?.dailyPoints < totalPoints) {
      return failed("Sorry, your Daily Points are insufficient");
    }
    if (user?.accessPoints < accessPointCharge) {
      return failed("Sorry, your Access Points are insufficient");
    }

    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/activities/daily_withdraw`, {
      method: "POST",
      body: JSON.stringify({
        ...withdrawInfo,
        dailyPointCharge: dailyPointCharge,
        accessPointCharge: accessPointCharge,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);

        if (data.data) {
          sucess("Request for Daily Point processed sucessfully");
          setwithdrawInfo({});
          dispatch(addUser(data.data));
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };
  return (
    <section >
      <div>
        <h3 className="main-title">Request for Daily Withdraw</h3>
      </div>
      <div className="common-form-styles">
        <form autoComplete="off" className="card" onSubmit={formHandle}>
          <p className="notice">
            You will be cost 10% of Daily Point and 2% of Access Points as
            charge per transition.
          </p>

          <div className="common-form-select-container">
            <div className="select-input-common-style">
              <label>Select Payment Method</label>
              <select
                name="porvider"
                value={withdrawInfo?.porvider && withdrawInfo.porvider}
                id="porvider"
                onChange={handleInput}
              >
                <option value="Bkash">bKash</option>
                <option value="Rocket">Rocket</option>
                <option value="Nagad">Nagad</option>
              </select>
            </div>
            <div className="select-input-common-style">
              <label>Select Amount</label>
              <select
                name="withdrawPoints"
                id="withdrawPoints"
                onChange={handleInput}
              >
                {/* <option>-- select points --</option> */}
                <option value="100">100 points</option>
                <option value="200">200 points</option>
                <option value="300">300 points</option>
                <option value="400">400 points</option>
                <option value="500">500 points</option>
                <option value="1000">1000 points</option>
              </select>
            </div>
            <div className="select-input-common-style">
              <label>Amount of TK</label>
              <select>
                {withdrawInfo?.withdrawPoints && (
                  <option>{withdrawInfo.withdrawPoints} tk</option>
                )}
              </select>
            </div>
            <div className="select-input-common-style">
              <label>Charge on Access Point</label>
              <select>
                {withdrawInfo?.withdrawPoints && (
                  <option>
                    {withdrawInfo.withdrawPoints * (2 / 100)} points
                  </option>
                )}
              </select>
            </div>
          </div>

          <label className="input">
            <input
              className="input__field"
              type="text"
              name="phoneNumber"
              value={withdrawInfo?.phoneNumber ? withdrawInfo.phoneNumber : ""}
              placeholder=" "
              onChange={handleInput}
            />
            <span className="input__label">Your Mobile-Bank Number</span>
          </label>
          {!loading ? (
            <input type="submit" value="Submit" />
          ) : (
            <ButtonLoading /> 
          )}
        </form>
      </div>
      <div className="common-table-style">
        <div className="d-flex align-items-center">
          <h4>Withdraw History</h4>
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
          {user?.dailyWithdroawHistory?.length ? (
            <>
              <div className="scroll-text">
                <p>scroll it</p>
              </div>
              <div>
                <table>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Provider</th>
                      <th>Receive Phone Number</th>
                      <th>Ammount Of TK</th>
                      <th>Ammount Of Points</th>
                      <th>Charge on Daily Points</th>
                      <th>Charge on Access Points</th>
                      <th>Approve</th>
                      <th>Request Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.dailyWithdroawHistory?.map((items, index) => {
                      return (
                        <tr key={items.requestID}>
                          <td>{index + 1}</td>
                          <td>{items.receiveBy}</td>
                          <td>{items.phoneNumber}</td>
                          <td>{items.amountOfPoints} Points</td>
                          <td>{items.amountOfTk} Tk</td>
                          <td>{items.dailyPointCharge} Points</td>
                          <td>{items.accessPointCharge} Points</td>
                          <td>{items.approve ? "Approved" : "Pending"}</td>
                          <td>{items.requestDate}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <div className="no-history">
              <p>Your have no history here !</p>
            </div>
          )}
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default DailyWithdraw;

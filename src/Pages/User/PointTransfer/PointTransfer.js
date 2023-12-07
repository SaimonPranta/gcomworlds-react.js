import React, { useState } from "react";
import "./PointTransfer.css";
import { FaAngleDoubleDown } from "react-icons/fa";
import { getCookie } from "../../../Hooks/cookies";
import { useDispatch, useSelector } from "react-redux";
import failed from "../../../Shades/Toastes/failed";
import sucess from "../../../Shades/Toastes/sucess";
import { addUser } from "../../../Store/UserSlice/UserSlice";
import { tableCollaps } from "../../../Functions/tableCollaps";
import ButtonLoading from "../../../Models/ButtonLoading/ButtonLoading";

const PointTransfer = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user.data);
   

  const [balanceInfo, setBalanceInfo] = useState({});
  const dispatch = useDispatch();

  const handleUpdateInput = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    const info = { ...balanceInfo };
    info[name] = value;
    setBalanceInfo(info);
  };
  console.log(user.accessPoints);
  const balanceTransferHandle = (e) => {
    e.preventDefault();
    if (loading) {
      return failed("Request are processing, please wait a moment");
    }
    if (user.userID == balanceInfo.receiverID) {
      return failed("Sorry, you can't transfer point in your won account");
    }
    if (!balanceInfo.receiverID || !balanceInfo.amount) {
      return failed("Please fill the form and then try");
    }
    if (!Number(balanceInfo.amount)) {
      return failed("Amount of Access Points must be number");
    }
    const charge = Number(balanceInfo.amount) * (10 / 100);
    const totalAmount = Number(balanceInfo.amount) + charge;
    if (Number(user.accessPoints) < totalAmount) {
      return failed("Sorry, you have insufficient balance");
    }
    setLoading(true);
    fetch(`${process.env.REACT_APP_SERVER_HOST_URL}/activities/point_transfer`, {
      method: "POST",
      body: JSON.stringify({
        ...balanceInfo,
        id: user._id,
        charge: charge,
      }),
      headers: {
        "content-type": "application/json; charset=UTF-8",
        authorization: `Bearer ${getCookie()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setLoading(false);

        if (data.data) {
          sucess("Point Transfer sucessfull");
          setBalanceInfo({});
          dispatch(addUser(data.data));
        }
        if (data.failed) {
          failed(data.failed);
        }
      });
  };

  return (
    <section className="balance-transfer ">
      <div>
        <h3 className="main-title">Transfer Your Access Points</h3>
      </div>
      <div className="common-form-styles">
        <form
          autoComplete="off"
          className="card"
          onSubmit={balanceTransferHandle}
        >
          <p className="notice">
            You will be cost 10% of Access Points as charge per transition.
          </p>
          <label className="input">
            <input
              className="input__field"
              type="text"
              name="receiverID"
              value={balanceInfo?.receiverID ? balanceInfo.receiverID : ""}
              onChange={handleUpdateInput}
              required
              placeholder=" "
            />
            <span className="input__label">Receive ID</span>
          </label>
          <label className="input">
            <input
              className="input__field"
              type="text"
              name="amount"
              value={balanceInfo.amount ? balanceInfo.amount : ""}
              onChange={handleUpdateInput}
              required
              placeholder=" "
            />
            <span className="input__label"> Amount of Access Points </span>
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
          <h4>Point Transfer History</h4>
          <FaAngleDoubleDown
            className="table-collaps-icon"
            id="collaps-icon"
            onClick={tableCollaps}
          />
        </div>
        {user?.accessPointsTransferHistory?.length ? (
          <div
            className="active-common-table-container common-table-container"
            id="table-container"
          >
            <div className="scroll-text">
              <p>scroll it</p>
            </div>
            <div>
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Receiver ID </th>
                    <th>Transfer Ammount</th>
                    <th>Transfer Date</th>
                  </tr>
                </thead>
                <tbody>
                  {user.accessPointsTransferHistory.map((items, index) => {
                    return (
                      <tr key={items.requestID}>
                        <td>{index + 1}</td>
                        <td className="table-name">{items.receiverName}</td>
                        <td>{items.receiverID}</td>
                        <td>{items.amount} Points</td>
                        <td className="table-date">{items.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="no-history">
            <p>Your have no history here !</p>
          </div>
        )}
      </div>
      <div>{/* <ToastContainer /> */}</div>
    </section>
  );
};

export default PointTransfer;

import React from "react";
import "./BuyHistory.scss"; 
import { useSelector } from "react-redux";

const BuyHistory = () => {
  const { fullName } = useSelector((state) => state.user.data);

  return (
    <section className="buy-history">
      <div className="title">
        <h6>{`${fullName}'s buy history`} </h6>
      </div>

      <div>
        <h3>No history available yet !</h3>
      </div>
    </section>
  );
};

export default BuyHistory;

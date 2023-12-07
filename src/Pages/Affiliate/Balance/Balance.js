import React from "react";
import "./Balance.css";
import { FaCoins } from "react-icons/fa";
import { useSelector } from "react-redux";

const Balance = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <section>
      <div>
        <div>
          <h4>Daily Points</h4>
        </div>
        <div className="points-card daily-points">
          <div>
            <h4>
              <FaCoins /> Balance
            </h4>
            <p>
              Total Balance{" "}
              <span>: {user?.Balance ? user.Balance : 0} TK</span>
            </p>
            <p>
              Total Withdraw
              <span>
                : {user?.withdrawBalance ? user.withdrawBalance : 0} TK
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Balance;

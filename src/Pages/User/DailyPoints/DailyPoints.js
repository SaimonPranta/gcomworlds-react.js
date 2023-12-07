import React from "react";
import "./DailyPoints.css";
import { FaCoins } from "react-icons/fa";
import { useSelector } from "react-redux";

const DailyPoints = () => {
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
              <FaCoins /> Daily Points
            </h4>
            <p>
              Total Daily Points{" "}
              <span>: {user?.dailyPoints ? user.dailyPoints : 0} TK</span>
            </p>
            {/* <p>
              Total Income
              <span>: 34 TK</span>
            </p> */}
            <p>
              Total Withdraw
              <span>
                : {user?.withdrawDailyPoints ? user.withdrawDailyPoints : 0} TK
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyPoints;

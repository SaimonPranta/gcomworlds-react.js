import React from "react";
import { FaCoins } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./RegularPoints.css";
const RegularPoints = () => {
  const user = useSelector((state) => state.user.data);

  return (
    <section>
      <div>
        <div>
          <h4>Regular Points</h4>
        </div>
        <div className="points-card regular-points">
          <div>
            <h4>
              <FaCoins /> Regular Points
            </h4>
            <p>
              Total Regular Points{" "}
              <span>: {user?.regularPoints ? user.regularPoints : 0} TK</span>
            </p>
            {/* <p>
              Total Income
              <span>: 34 TK</span>
            </p> */}
            <p>
              Total Withdraw
              <span>
                : {user?.withdrawRegularPoints ? user.withdrawRegularPoints : 0}{" "}
                TK
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RegularPoints;

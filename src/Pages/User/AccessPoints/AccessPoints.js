import React from "react";
import { FaCoins } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./AccessPoints.css";

const AccessPoints = () => {
  const user = useSelector((state) => state.user.data);
   

  return (
    <section>
      <div>
        <div>
          <h4>Access Points</h4>
        </div>
        <div className="points-card access-points">
          <div>
            <h4>
              <FaCoins /> Access Points
            </h4>
            <p>
              Total Access Points{" "}
              <span>
                : {user?.accessPoints ? user.accessPoints : 0}{" "}
                TK
              </span>
            </p>
            {/* <p>
              Total Income
              <span>: 34 TK</span>
            </p> */}
            <p>
              Total Withdraw
              <span>
                : {user?.withdrawAccessPoints ? user.withdrawAccessPoints : 0}{" "}
                TK
              </span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AccessPoints;

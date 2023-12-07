import React, { useState } from "react";
import "./TransferToAffiliate.scss";
import { useSelector } from "react-redux";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";
import { getCookie } from "../../../Hooks/cookies";
import { useNavigate } from "react-router-dom";

const TransferToAffiliate = () => {
  const [condition, setCondition] = useState({ sureModal: false });
  const navigate = useNavigate();

  const submitUpgrade = () => {
    fetch(
      `${process.env.REACT_APP_SERVER_HOST_URL}/buyer/activities/upgrade_to_affiliate`,
      {
        headers: {
          "content-type": "application/json; charset=UTF-8",
          authorization: `Bearer ${getCookie()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("data", data);
        if (data.success) {
          navigate("/");
        }
      });
  };

  return (
    <section className="transfer-to-affiliate-container">
      <div>
        <div>
          <h4>Be an Affiliate User</h4>
        </div>
        <div className="transfer-to-affiliate">
          <button
            onClick={() =>
              setCondition((state) => {
                return {
                  ...state,
                  sureModal: true,
                };
              })
            }
          >
            Upgrade to Affiliate
          </button>
        </div>
      </div>
      {condition?.sureModal && (
        <div className="sure-modal">
          <div className="inner-container">
            <div className="message">
              <p>
                I am sure that I want to upgrade my account to affiliate account
              </p>
            </div>
            <div className="action-container">
              <button onClick={submitUpgrade}>
                <TiTick /> Yes, I'm sure
              </button>
              <button
                onClick={() => {
                  setCondition((state) => {
                    return {
                      ...state,
                      sureModal: false,
                    };
                  });
                }}
              >
                <RxCross2 /> No, Not yet
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TransferToAffiliate;

import React from "react";
import { hideModel } from "../../Hooks/handleModel";
import "./SureVirifyerModel.css";

const SureVirifyerModel = ({ props }) => { 
  
  return (
    <div className="sure-verifire-container" id="sure-verifire-container">
      <div className="inner-container">
        <h5>Are you sure to take this action ?</h5>
        <div className="btn-container">
          <button
            onClick={() =>
              hideModel(
                "sure-verifire-container",
                "active-sure-verifire-container"
              )
            }
          >
            No
          </button>{" "}
          {props.argument ? (
            <button
              onClick={() => {
                hideModel(
                  "sure-verifire-container",
                  "active-sure-verifire-container"
                );
                props.function(props.argument);
              }}
            >
              Yes
            </button>
          ) : (
            <button
              onClick={() => {
                hideModel(
                  "sure-verifire-container",
                  "active-sure-verifire-container"
                );
                props.function();
              }}
            >
              Yes
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SureVirifyerModel;

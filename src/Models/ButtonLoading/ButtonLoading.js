import React from "react";
import "./ButtonLoading.css";

const ButtonLoading = () => {
  return (
    <button class="btn " type="button" >
      <span
        class="spinner-border spinner-border-sm"
        role="status"
        aria-hidden="true"
      ></span>
      Loading...
    </button>
  );
};

export default ButtonLoading;

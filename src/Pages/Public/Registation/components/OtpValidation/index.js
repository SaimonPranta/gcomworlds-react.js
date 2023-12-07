import React from "react";

const Index = ({ input, handelChange, formOtpSubmit, enableBtn = true }) => {
  return (
    <>
      <form onSubmit={formOtpSubmit}>
        <h6>Validate OTP</h6>
        <label style={{ fontSize: ".9rem", fontWeight: "100" }}>
          Please enter the OTP (one time password) to verify your account. A
          Code has been sent to 01*****
          {input.phoneNumber && input.phoneNumber.substring(8)}
        </label>
        <label>Enter 6 digit code</label>
        <input
          type="text"
          placeholder="OTP code"
          name="otp"
          value={input.otp ? input.otp : ""}
          autoComplete="off"
          onChange={handelChange}
        />
        <input type="submit" disabled={enableBtn} value="Verify" />
      </form>
    </>
  );
};

export default Index;

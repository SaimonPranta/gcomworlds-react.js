import { authentication } from "../../../../../Firebase/firebase.config";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

export const handleFormSubmit = async (phoneNumber) => {
  try {
    const finalNumber = `+88${phoneNumber.trim()}`;
console.log("finalNumber", finalNumber);
    window.recaptchaVerifier = await new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {},
      },
      authentication
    );
    const result = await verifierFunction(finalNumber);
    console.log("result form phone otp send", result);
    return result;
  } catch (error) {
console.log("error", error);

    return false;
  }
};

const verifierFunction = async (phoneNumber) => {
  try {
    console.log("phoneNumber ==>", phoneNumber);
    const appVerifier = await window.recaptchaVerifier;
console.log("appVerifier", appVerifier);
    const result = await signInWithPhoneNumber(
      authentication,
      phoneNumber,
      appVerifier
    );
    console.log("result , ", result);
    window.confirmationResult = result;
    return true;
  } catch (error) {
    console.log("error", error)
    // const humanCheckerDiv = document.getElementById("sign-in-button");
    // if (humanCheckerDiv) {
    //   humanCheckerDiv.remove();
    // }
    return false;
  }
};

export const handleOtpVerification = async (otpCode) => {
  try {
    let confirmationResult = await window.confirmationResult;
    await confirmationResult.confirm(otpCode);
    return true;
  } catch (error) {
    return false;
  }
};

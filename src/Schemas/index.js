import * as Yup from "yup";

export const singUpSchema = Yup.object({
  fullName: Yup.string()
    .min(4, "Your name must be more then 4 figure")
    .max(18, "Your name must be less then 18 figure")
    .required("Please enter your name"),
  fatherName: Yup.string()
    .min(4, "Father name must be more then 4 figure")
    .max(18, "Father name must be less then 18 figure")
    .required("Please enter your father name"),
  motherName: Yup.string()
    .min(4, "Mother name must be more then 4 figure")
    .max(18, "Mother name must be less then 18 figure")
    .required("Please enter your mother name"),
  gender: Yup.string().required("Please select your gender"),
  phoneNumber: Yup.string().required("Please enter your phone number"),
  userID: Yup.string()
    .min(4, "User ID must be more then 4 figure")
    .max(18, "Youer ID must be less then 18 figure")
    .required("Please enter your user ID"),
  address: Yup.string().required("Please enter your address"),
  country: Yup.string().required("Please enter your country Name"),
  nid: Yup.number("NID must be a number").required(
    "Please enter your NID number"
  ),
  referID: Yup.string().required("Please enter your referral ID"),
  placementVolume: Yup.string().required("Please Select your Placement Volume"),
  placementID: Yup.string().required("Please enter your PlacementID ID"),
  email: Yup.string().email("Please provide a valid email"),
  password: Yup.string()
    .min(5, "Password must be more than 4 figure")
    .max(25, "Password must be less then 25 figure")
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .required("Please enter your confirm password")
    .oneOf(
      [Yup.ref("password"), null],
      "Confirm password must be match with password"
    ),
});
export const resetPasswordSchema = Yup.object({
  password: Yup.string()
    .max(25, "Password must be less then 25 figure")
    .required("Please enter your password"),
  newPassword: Yup.string()
    .min(5, "Password must be more than 4 figure")
    .max(25, "Password must be less then 25 figure")
    .required("Please enter your password"),
  confirmNewPassword: Yup.string()
    .required("Please enter your confirm password")
    .oneOf(
      [Yup.ref("newPassword"), null],
      "Confirm password must be match with new password"
    ),
});

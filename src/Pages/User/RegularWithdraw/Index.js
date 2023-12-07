import React from "react";
import UserDashboardLayout from "../../../Layouts/UserDashboardLayout";
import RegularWithdraw from "./RegularWithdraw";

const Index = () => {
  return <UserDashboardLayout children={<RegularWithdraw />} />;
};

export default Index;

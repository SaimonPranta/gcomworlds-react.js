import React from "react";
import UserDashboardLayout from "../../../Layouts/UserDashboardLayout";
import DailyWithdraw from "./DailyWithdraw";

const Index = () => {
  return <UserDashboardLayout children={<DailyWithdraw />} />;
};

export default Index;

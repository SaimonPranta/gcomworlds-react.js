import React from "react";
import UserDashboardLayout from "../../../Layouts/UserDashboardLayout";
import DailyPoints from "./DailyPoints";

const Index = () => {
  return <UserDashboardLayout children={<DailyPoints />} />;
};

export default Index;

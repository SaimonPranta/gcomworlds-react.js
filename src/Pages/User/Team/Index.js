import React from "react";
import UserDashboardLayout from "../../../Layouts/UserDashboardLayout";
import Team from "./Team";

const Index = () => {
  return <UserDashboardLayout children={<Team />} />;
};

export default Index;

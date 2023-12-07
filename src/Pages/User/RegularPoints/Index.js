import React from "react";
import UserDashboardLayout from "../../../Layouts/UserDashboardLayout";
import RegularPoints from "./RegularPoints";

const Index = () => {
  return <UserDashboardLayout children={<RegularPoints />} />;
};

export default Index;

import React from "react";
import UserDashboardLayout from "../../../Layouts/UserDashboardLayout";
import AccessPoints from "./AccessPoints";

const Index = () => {
  return <UserDashboardLayout children={<AccessPoints />} />;
};

export default Index;

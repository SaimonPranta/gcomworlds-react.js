import React from "react";
import AdminDashboardLayout from "../../../Layouts/adminDashboardLayout";
import ConfigSetting from "./ConfigSetting";

const Index = () => {
  return <AdminDashboardLayout children={<ConfigSetting />} />;
};

export default Index;

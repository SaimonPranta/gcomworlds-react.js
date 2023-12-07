import React from "react";
import AdminDashboardLayout from "../../../Layouts/adminDashboardLayout";
import AdminNewRequest from "./AdminNewRequest";

const Index = () => {
  return <AdminDashboardLayout children={<AdminNewRequest />} />;
};

export default Index;

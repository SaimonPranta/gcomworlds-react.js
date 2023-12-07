import React from "react";
import AdminDashboardLayout from "../../../Layouts/adminDashboardLayout";
import AdminStartWork from "./AdminStartWork";

const Index = () => {
  return <AdminDashboardLayout children={<AdminStartWork />} />;
};

export default Index;

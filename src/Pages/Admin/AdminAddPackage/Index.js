import React from "react";
import AdminDashboardLayout from "../../../Layouts/adminDashboardLayout";
import AdminAddPackage from "./AdminAddPackage";

const Index = () => {
  return <AdminDashboardLayout children={<AdminAddPackage />} />;
};

export default Index;

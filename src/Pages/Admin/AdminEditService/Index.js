import React from "react";
import AdminDashboardLayout from "../../../Layouts/adminDashboardLayout";
import AdminEditService from "./AdminEditService";

const Index = () => {
  return <AdminDashboardLayout children={<AdminEditService />} />;
};

export default Index;

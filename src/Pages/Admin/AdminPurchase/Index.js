import React from "react";
import AdminDashboardLayout from "../../../Layouts/adminDashboardLayout";
import AdminPurchase from "./AdminPurchase";

const Index = () => {
  return <AdminDashboardLayout children={<AdminPurchase />} />;
};

export default Index;

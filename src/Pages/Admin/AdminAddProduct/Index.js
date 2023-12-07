import React from "react";
import AdminDashboardLayout from "../../../Layouts/adminDashboardLayout";
import AdminAddProduct from "./AdminAddProduct";

const Index = () => {
  return <AdminDashboardLayout children={<AdminAddProduct />} />;
};

export default Index;

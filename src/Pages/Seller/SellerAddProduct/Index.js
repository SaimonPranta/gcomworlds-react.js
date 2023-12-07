import React from "react";
import SellerDashboardLayout from "../../../Layouts/SellerDashboardLayout";
import AdminAddProduct from "./SellerAddProduct";

const Index = () => {
  return <SellerDashboardLayout children={<AdminAddProduct />} />;
};

export default Index;

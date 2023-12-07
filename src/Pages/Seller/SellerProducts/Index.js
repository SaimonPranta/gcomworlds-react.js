import React from "react";
import SellerDashboardLayout from "../../../Layouts/SellerDashboardLayout";
import SellerProducts from "./SellerProducts";

const Index = () => {
  return <SellerDashboardLayout children={<SellerProducts />} />;
};

export default Index;

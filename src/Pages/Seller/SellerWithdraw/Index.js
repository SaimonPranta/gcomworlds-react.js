import React from "react";
import SellerDashboardLayout from "../../../Layouts/AffiliateDashboardLayout";
import SellerWithdraw from "./SellerWithdraw";

const Index = () => {
  return <SellerDashboardLayout children={<SellerWithdraw />} />;
};

export default Index;

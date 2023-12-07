import React from "react";
import SellerDashboardLayout from "../../../Layouts/SellerDashboardLayout";
import DailyPoints from "./SaleHistory";

const Index = () => {
  return <SellerDashboardLayout children={<DailyPoints />} />;
};

export default Index;

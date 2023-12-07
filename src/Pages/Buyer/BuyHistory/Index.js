import React from "react";
import BuyerDashboardLayout from "../../../Layouts/BuyerDashboardLayout";
import BuyHistory from "./BuyHistory";

const Index = () => {
  return <BuyerDashboardLayout children={<BuyHistory />} />;
};

export default Index;

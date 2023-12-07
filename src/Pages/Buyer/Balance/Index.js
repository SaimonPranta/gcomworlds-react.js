import React from "react";
import BuyerDashboardLayout from "../../../Layouts/BuyerDashboardLayout";
import DailyPoints from "./Balance";

const Index = () => {
  return <BuyerDashboardLayout children={<DailyPoints />} />;
};

export default Index;

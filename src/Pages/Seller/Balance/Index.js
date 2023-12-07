import React from "react";
import SalerDashboardLayout from "../../../Layouts/SellerDashboardLayout";
import DailyPoints from "./Balance";

const Index = () => {
  return <SalerDashboardLayout children={<DailyPoints />} />;
};

export default Index;

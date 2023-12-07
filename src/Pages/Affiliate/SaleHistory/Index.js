import React from "react";
import AffiliateDashboardLayout from "../../../Layouts/AffiliateDashboardLayout";
import DailyPoints from "./SaleHistory";

const Index = () => {
  return <AffiliateDashboardLayout children={<DailyPoints />} />;
};

export default Index;

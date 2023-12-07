import React from "react";
import AffiliateDashboardLayout from "../../../Layouts/AffiliateDashboardLayout";
import DailyPoints from "./Balance";

const Index = () => {
  return <AffiliateDashboardLayout children={<DailyPoints />} />;
};

export default Index;

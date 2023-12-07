import React from "react";
import DashboardHeader from "../Shades/DashboardHeadere/DashboardHeadere";
import AffiliateDashboardSideNave from "../Shades/AffiliateDashboardSideNave/AffiliateDashboardSideNave";

const AffiliateDashboardLayout = ({ children }) => {
  return (
    <main className="dashboard">
      <DashboardHeader />
      <div className="dashboard-container ">
        <AffiliateDashboardSideNave />
        <section className="dashboard-body" id="dashboard_body">
          {children}
        </section>
      </div>
    </main>
  );
};

export default AffiliateDashboardLayout;

import React from "react";
import DashboardHeader from "../Shades/DashboardHeadere/DashboardHeadere";
import BuyerDashboardSideNave from "../Shades/BuyerDashboardSideNave/BuyerDashboardSideNave";

const BuyerDashboardLayout = ({ children }) => {
  return (
    <main className="dashboard">
      <DashboardHeader />
      <div className="dashboard-container ">
        <BuyerDashboardSideNave />
        <section className="dashboard-body" id="dashboard_body">
          {children}
        </section>
      </div>
    </main>
  );
};

export default BuyerDashboardLayout;

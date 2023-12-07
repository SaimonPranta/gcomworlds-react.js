import React from "react";
import DashboardHeader from "../Shades/DashboardHeadere/DashboardHeadere";
import SellerDashboardSideNave from "../Shades/SellerDashboardSideNave/SellerDashboardSideNave";

const SellerDashboardLayout = ({ children }) => {
  return (
    <main className="dashboard">
      <DashboardHeader />
      <div className="dashboard-container ">
        <SellerDashboardSideNave />
        <section className="dashboard-body" id="dashboard_body">
          {children}
        </section>
      </div>
    </main>
  );
};

export default SellerDashboardLayout;

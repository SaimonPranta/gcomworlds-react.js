import React from "react";
import DashboardHeader from "../Shades/DashboardHeadere/DashboardHeadere";
import DashborardSideNave from "../Shades/DashborardSideNave/DashboardSideNave";

const UserDashboardLayout = ({ children }) => {
  return (
    <main className="dashboard">
      <DashboardHeader />
      <div className="dashboard-container ">
        <DashborardSideNave />
        <section className="dashboard-body" id="dashboard_body">
          {children}
        </section>
      </div>
    </main>
  );
};

export default UserDashboardLayout;

import React from "react";
import AdminDashboardSidNav from "../Shades/AdminDashboardSidNav/AdminDashboardSidNav";
import DashboardHeader from "../Shades/DashboardHeadere/DashboardHeadere";

const AdminDashboardLayout = ({ children }) => {
  return (
    <main className="dashboard">
      <DashboardHeader />
      <div className="dashboard-container ">
        <AdminDashboardSidNav />
        <div className="dashboard-body" id="dashboard_body">
          {children}
        </div>
      </div>
    </main>
  );
};

export default AdminDashboardLayout;

import React from "react";
import AdminDashboardLayout from "../../../Layouts/adminDashboardLayout";
import AdminInvoiceInbox from "./AdminInvoiceInbox";

const Index = () => {
  return <AdminDashboardLayout children={<AdminInvoiceInbox />} />;
};

export default Index;

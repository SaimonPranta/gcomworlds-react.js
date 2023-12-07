import React from "react";
import UserDashboardLayout from "../../../Layouts/UserDashboardLayout";
import UserProducts from "./UserProducts";

const Index = () => {
  return <UserDashboardLayout children={<UserProducts />} />;
};

export default Index;

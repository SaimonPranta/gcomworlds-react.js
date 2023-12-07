import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout';
import AdminRegularWithdraw from './adminRegularWithdraw';

const Index = () => {
      return <AdminDashboardLayout children={<AdminRegularWithdraw />} />;

};

export default Index;
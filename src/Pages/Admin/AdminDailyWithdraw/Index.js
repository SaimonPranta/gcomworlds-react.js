import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout';
import AdminDailyWithdraw from './AdminDailyWithdraw';

const Index = () => {
      return <AdminDashboardLayout children={<AdminDailyWithdraw />} />;

};

export default Index;
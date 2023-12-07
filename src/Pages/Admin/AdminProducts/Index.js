import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout';
import AdminProducts from './AdminProducts';

const Index = () => {
      return <AdminDashboardLayout children={<AdminProducts />} />;

};

export default Index;
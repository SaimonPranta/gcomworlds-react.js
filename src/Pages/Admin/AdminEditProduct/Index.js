import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout';
import AdminEditProduct from './AdminEditProduct';

const Index = () => {
      return <AdminDashboardLayout children={<AdminEditProduct />} />;

};

export default Index;
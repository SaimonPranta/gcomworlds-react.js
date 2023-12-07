import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout';
import AdminAddService from './AdminAddService';

const Index = () => {
      return <AdminDashboardLayout children={<AdminAddService />} />;

};

export default Index;
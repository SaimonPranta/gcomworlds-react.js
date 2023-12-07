import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout';
import AdminPackges from './AdminPackges';

const Index = () => {
     return <AdminDashboardLayout children={<AdminPackges />} />;

};

export default Index;
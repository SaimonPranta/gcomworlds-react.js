import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout';
import AdminServices from './AdminServices';

const Index = () => {
     return <AdminDashboardLayout children={<AdminServices />} />;

};

export default Index;
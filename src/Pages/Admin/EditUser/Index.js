import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout';
import EditUser from './EditUser';

const Index = () => {
     return <AdminDashboardLayout children={<EditUser />} />;
};

export default Index;
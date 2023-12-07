import React from 'react';
import AdminDashboardLayout from '../../../Layouts/adminDashboardLayout'; 
import AllUser from './AllUser';

const Index = () => {
    return <AdminDashboardLayout children={<AllUser />} />;
};

export default Index;
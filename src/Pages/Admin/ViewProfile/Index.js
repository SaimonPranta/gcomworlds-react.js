import React from 'react';
import UserDashboardLayout from '../../../Layouts/UserDashboardLayout';
import ViewProfile from './ViewProfile';

const Index = () => {
    return <UserDashboardLayout children={<ViewProfile />} />;
};

export default Index;
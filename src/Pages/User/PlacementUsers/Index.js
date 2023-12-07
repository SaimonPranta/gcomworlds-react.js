import React from 'react';
import UserDashboardLayout from '../../../Layouts/UserDashboardLayout';
import PlacementUsers from './PlacementUsers';

const Index = () => {
    return <UserDashboardLayout children={<PlacementUsers />} />;
};

export default Index;
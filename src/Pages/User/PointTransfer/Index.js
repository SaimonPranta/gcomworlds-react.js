import React from 'react';
import UserDashboardLayout from '../../../Layouts/UserDashboardLayout';
import PointTransfer from './PointTransfer';

const Index = () => {
    return <UserDashboardLayout children={<PointTransfer />} />;
};

export default Index;
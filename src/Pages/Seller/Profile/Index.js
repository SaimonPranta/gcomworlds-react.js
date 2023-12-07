import React from 'react';
import SellerDashboardLayout from '../../../Layouts/SellerDashboardLayout';
import Profile from '../../CommonPages/Profile/Profile';

const index = () => {
    return <SellerDashboardLayout children={<Profile />} />;
};

export default index;
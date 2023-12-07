import React from 'react';
import BuyerDashboardLayout from "../../../Layouts/BuyerDashboardLayout";
import Profile from '../../CommonPages/Profile/Profile';

const index = () => {
    return <BuyerDashboardLayout children={<Profile />} />;
};

export default index;
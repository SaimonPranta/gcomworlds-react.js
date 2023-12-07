import React from 'react';
import UserDashboardLayout from '../../../Layouts/UserDashboardLayout';
import Profile from '../../CommonPages/Profile/Profile';

const index = () => {
    return <UserDashboardLayout children={<Profile />} />;
};

export default index;
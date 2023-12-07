import React from 'react';
import AffiliateDashboardLayout from "../../../Layouts/AffiliateDashboardLayout";
import Profile from '../../CommonPages/Profile/Profile';

const index = () => {
    return <AffiliateDashboardLayout children={<Profile />} />;
};

export default index;
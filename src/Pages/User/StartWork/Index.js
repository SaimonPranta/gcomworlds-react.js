import React from 'react';
import UserDashboardLayout from '../../../Layouts/UserDashboardLayout';
import StartWork from './StartWork';

const Index = () => {
    return (  <UserDashboardLayout children={<StartWork />} /> );
};

export default Index;
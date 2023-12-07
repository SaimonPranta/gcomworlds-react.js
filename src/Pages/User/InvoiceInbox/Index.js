import React from 'react';
import UserDashboardLayout from '../../../Layouts/UserDashboardLayout';
import InvoiceInbox from './InvoiceInbox';

const Index = () => {
    return <UserDashboardLayout children={<InvoiceInbox />} />;
};

export default Index;
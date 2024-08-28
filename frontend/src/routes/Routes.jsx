// routes/RoutesComponent.jsx
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import AdminHomePage from '../pages/admin/AdminHomePage';
import PrivateRoute from './privateRoute';
import CustomerHomePage from '../pages/customer/CustomerHomePage';

const RoutesComponent = () => (
    <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
            path="/admin-home"
            element={
                <PrivateRoute roles={['admin']}>
                    <AdminHomePage />
                </PrivateRoute>
            }
        />

        <Route
            path="/customer-home"
            element={
                <PrivateRoute roles={['customer']}>
                    <CustomerHomePage />
                </PrivateRoute>
            }
        />

    </Routes>
);

export default RoutesComponent;

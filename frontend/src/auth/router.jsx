// routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import LoginPage from './pages/LoginPage';
import AdminHomePage from '../admin/pages/Home/AdminHomePage';
import PrivateRoute from '../app/PrivateRoute';
import CustomerHomePage from '../customer/pages/CustomerHomePage';
import ResgisterPage from './pages/ResgisterPage';

const AuthRouter = () => (
    <Router>
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
            <Route path="/resgister" element={<ResgisterPage />} />
        </Routes>
    </Router>
);

export default AuthRouter;

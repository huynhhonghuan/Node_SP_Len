// routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import LoginPage from './pages/LoginPage';
import ResgisterPage from './pages/ResgisterPage';

const LoginRoute = () => (
    <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/resgister" element={<ResgisterPage />} />
    </Routes>
)

export default LoginRoute;

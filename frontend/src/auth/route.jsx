// routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/register/RegisterForm';
import Logout from './components/logout/Logout';

const LoginRoute = () => (
    <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/resgister" element={<RegisterForm />} />
        <Route path="/logout" element={<Logout />} />
    </Routes>
)

export default LoginRoute;

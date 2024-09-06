// routes/Routes.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import LoginRoute from './route';

const LoginIndex = () => {
    return (
        <LoginRoute />
    )
}

export default LoginIndex;

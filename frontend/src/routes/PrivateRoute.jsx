// components/PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, roles }) => {
    const token = Cookies.get('token');
    let userRole = '';

    if (token) {
        try {
            const decodedToken = jwtDecode(token);
            userRole = decodedToken.role; // Thay đổi tùy thuộc vào cấu trúc token của bạn
        } catch (error) {
            console.error('Token decoding error:', error);
        }
    }

    const location = useLocation();

    if (!token || !roles.includes(userRole)) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;

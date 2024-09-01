import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../auth/services/authService';

function CustomerHomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // Chuyển hướng về trang đăng nhập
        navigate('/login');
    };

    return (
        <div>
            <h1>Customer Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default CustomerHomePage;

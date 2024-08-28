import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth/authService';

function AdminHomePage() {
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        // Chuyển hướng về trang đăng nhập
        navigate('/login');
    };

    return (
        <div>
            <h1>Admin Home</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default AdminHomePage;

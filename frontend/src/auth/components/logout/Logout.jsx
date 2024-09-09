import React, { useEffect, useState } from 'react';
import { logout } from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigate = useNavigate();
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    useEffect(() => {
        const performLogout = async () => {
            try {
                await logout(); // Nếu logout là hàm bất đồng bộ
                setLogoutSuccess(true);
                setTimeout(() => {
                    navigate('/login');
                }, 5000); // Thời gian hiển thị thông báo trước khi chuyển hướng (2000ms = 2 giây)
            } catch (error) {
                console.error('Error logging out:', error);
                // Xử lý lỗi, có thể thông báo cho người dùng về lỗi
            }
        };

        performLogout();
    }, [navigate]);

    return (
        <div>
            {logoutSuccess ? (
                <div className='text-center' style={{ height: "200px" }}>Đăng xuất thành công. Đang chuyển hướng về trang đăng nhập...</div>
            ) : (
                <div className='text-center' style={{ height: "200px" }}>Đang đăng xuất...</div>
            )}
        </div>
    );
}

export default Logout;

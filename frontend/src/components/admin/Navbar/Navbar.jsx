import React, { useState } from 'react';
import navbar_sidebar from '../../../assets/images/admin/navbar-sidebar.png';
import navbar_message from '../../../assets/images/admin/navbar-message.png';
import navbar_notification from '../../../assets/images/admin/navbar-notification.png';
import navbar_user from '../../../assets/images/admin/navbar-user.png';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);

    const toggleUserMenu = () => {
        setShowUserMenu(!showUserMenu); // Chuyển đổi trạng thái ẩn/hiện menu
    };

    return (
        <div className="navbar">
            <div className="navbar-sidebar">
                <img src={navbar_sidebar} alt="" />
            </div>
            <div className="navbar-info">
                {/* <img src={navbar_message} alt="" /> */}
                {/* <img src={navbar_notification} alt="" /> */}
                <div className="navbar-user">
                    <img src={navbar_user} alt="" onClick={toggleUserMenu} />

                    {showUserMenu && (
                        <div className="user-menu">
                            {/* <button className="user-menu-button">Xem thông tin</button> */}
                            <Link to={'/logout'} className='user-menu-button btn btn-sm btn-warning'>
                                Đăng xuất
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;

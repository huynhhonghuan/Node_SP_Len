import React from 'react';
import navbar_sidebar from '../../../admin/assets/navbar-sidebar.png';
import navbar_message from '../../../admin/assets/navbar-message.png';
import navbar_notification from '../../../admin/assets/navbar-notification.png';
import navbar_user from '../../../admin/assets/navbar-user.png';
import "./Navbar.css";

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-sidebar">
                <img src={navbar_sidebar} alt="" />
            </div>
            <div className="navbar-info">
                <img src={navbar_message} alt="" />
                <img src={navbar_notification} alt="" />
                <img src={navbar_user} alt="" />
            </div>
        </div>
    )
}

export default Navbar;
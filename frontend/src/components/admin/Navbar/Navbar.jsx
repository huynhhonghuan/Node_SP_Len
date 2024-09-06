import React from 'react';
import navbar_sidebar from '../../../assets/images/admin/navbar-sidebar.png';
import navbar_message from '../../../assets/images/admin/navbar-message.png';
import navbar_notification from '../../../assets/images/admin/navbar-notification.png';
import navbar_user from '../../../assets/images/admin/navbar-user.png';
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
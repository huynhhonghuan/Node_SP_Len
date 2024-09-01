import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import "../../pages/Home/AdminHomePage.css";

function AdminHomePage() {
    return (
        <div className="admin">
            <Sidebar />
            <Navbar />
        </div>
    );
};

export default AdminHomePage;

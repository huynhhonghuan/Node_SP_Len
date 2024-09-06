import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import "./index.css";
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import Navbar from '../../components/admin/Navbar/Navbar';
import ListProduct from '../../components/admin/Product/ListProduct';

function AdminIndex() {
    return (
        <div className="admin">
            <div className="admin-sidebar">
                <Sidebar />
            </div>
            <div className="admin-content">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route path="product/*" element={<ListProduct />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminIndex;

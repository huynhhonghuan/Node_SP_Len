import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Navbar from '../../components/Navbar/Navbar';
import "../../pages/Home/AdminHomePage.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import ProductPage from '../Product/ProductPage';


const listName = 'Products';

function AdminHomePage() {
    return (
        <div className="admin">
            <div className="admin-sidebar">
                <Sidebar />
            </div>
            <div className="admin-content">
                <Navbar />
                <div className="content">
                    <Routes>
                        <Route
                            path="product/*"
                            element={<ProductPage />}
                        />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminHomePage;

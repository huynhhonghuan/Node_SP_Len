import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import AdminHomePage from "./pages/Home/AdminHomePage";

const AdminRoute = () => (
    <Router>
        <Routes>
            <Route path="/admin" element={<AdminHomePage />} />
        </Routes>
    </Router>
)

export default AdminRoute;
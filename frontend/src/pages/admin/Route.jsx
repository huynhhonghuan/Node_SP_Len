import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng

const AdminRoute = () => (
    <Routes>
        <Route path="/admin" element={<AdminIndex />} />
    </Routes>
)

export default AdminRoute;
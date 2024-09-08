import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import LoginIndex from '../auth/index';
import AdminIndex from '../pages/admin/index';
import HomeIndex from '../pages/home/Index';

const AllRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/*' element={<HomeIndex />} />
                {/* <Route path='/login/*' element={<LoginIndex />} /> */}
                <Route path="/admin/*" element={<AdminIndex />} />
                <Route path='/logout' element={<LoginIndex />} />
            </Routes>
        </Router>
    )
}

export default AllRouter;




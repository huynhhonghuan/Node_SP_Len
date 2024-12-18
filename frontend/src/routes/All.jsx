import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import AdminIndex from '../pages/admin/index';
import HomeIndex from '../pages/home/Index';
import PrivateRoute from '../app/PrivateRoute';
import UploadImage from '../pages/UploadImage';
import CustomerIndex from '../pages/customer/Index';
import StaffIndex from '../pages/staff/Index';
import ShipperIndex from '../pages/shipper/Index';

const AllRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path='/*' element={<HomeIndex />} />

                <Route path="/admin/*"
                    element={
                        <PrivateRoute roles={['admin']}>
                            <AdminIndex />
                        </PrivateRoute>
                    }
                />

                <Route path="/customer/*"
                    element={
                        <PrivateRoute roles={['customer']}>
                            <CustomerIndex />
                        </PrivateRoute>
                    }
                />

                <Route path="/staff/*"
                    element={
                        <PrivateRoute roles={['staff']}>
                            <StaffIndex />
                        </PrivateRoute>
                    }
                />

                <Route path="/shipper/*"
                    element={
                        <PrivateRoute roles={['shipper']}>
                            <ShipperIndex />
                        </PrivateRoute>
                    }
                />

                <Route path='/upload' element={<UploadImage />} />
            </Routes>
        </Router>
    )
}

export default AllRouter;
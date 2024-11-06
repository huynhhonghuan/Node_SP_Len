import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Đây là cách import đúng
import './Index.css';
import Navbar from '../../components/home/Navbar/Navbar';
import Footer from '../../components/home/Footer/Footer';
import HistoryOrder from '../../components/shipper/HistoryOrder/HistoryOrder';
import HomeShipper from '../../components/shipper/HomeShipper/HomeShipper';

function ShipperIndex() {
    return (
        <div className="container">
            <Navbar />
            <div className="content-main p-3">
                <ul class="d-flex justify-content-start me-2">
                    <Link to={'history'} className='text-black fw-bold me-2 btn btn-warning' style={{ textDecoration: 'none' }}>Lịch sử đơn hàng</Link>
                    <Link to={'/logout'} className='text-black fw-bold me-2 btn btn-warning ms-auto' style={{ textDecoration: 'none' }}>Đăng xuất</Link>
                </ul>
                <div className="content-customer">
                    <Routes>
                        <Route path='/' element={<HomeShipper />} />
                        <Route path='/history' element={<HistoryOrder />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default ShipperIndex;
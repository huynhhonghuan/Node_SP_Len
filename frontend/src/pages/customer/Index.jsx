import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Đây là cách import đúng
import './Index.css';
import Navbar from '../../components/home/Navbar/Navbar';
import Footer from '../../components/home/Footer/Footer';
import HistoryPay from '../../components/customer/HomeCustomer/HistoryPay';
import Comment from '../../components/customer/Comment/Comment';
import Information from '../../components/customer/Information/Information';
import Order from '../../components/customer/Order/Order';
import QuestionForm from '../../components/customer/Chatbot/Chatbot';

function CustomerIndex() {
    return (
        <div className="container">
            <Navbar />
            <div className="content-main p-3">
                <ul class="d-flex justify-content-start me-2">
                    <Link to={'history'} className='text-black fw-bold me-2 btn btn-warning' style={{ textDecoration: 'none' }}>Lịch sử mua hàng</Link>
                    <Link to={'comment'} className='text-black fw-bold me-2 btn btn-warning' style={{ textDecoration: 'none' }}>Đánh giá</Link>
                    <Link to={'chatbot'} className='text-black fw-bold me-2 btn btn-warning' style={{ textDecoration: 'none' }}>Chatbot</Link>
                    <Link to={'information'} className='text-black fw-bold me-2 btn btn-warning ms-auto' style={{ textDecoration: 'none' }}>Thông tin</Link>
                    <Link to={'/logout'} className='text-black fw-bold me-2 btn btn-warning' style={{ textDecoration: 'none' }}>Đăng xuất</Link>
                </ul>
                <div className="content-customer">
                    <Routes>
                        <Route path='/' element={<HistoryPay />} />
                        <Route path='/history' element={<HistoryPay />} />
                        <Route path='/order/:id' element={<Order />} />
                        <Route path='/comment' element={<Comment />} />
                        <Route path='/information' element={<Information />} />
                        <Route path='/chatbot' element={<QuestionForm />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default CustomerIndex;
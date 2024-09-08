import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import './Index.css';
import Navbar from '../../components/home/Navbar/Navbar';
import Footer from '../../components/home/Footer/Footer';
import LoginIndex from '../../auth/index';
import About from '../../components/home/About/About';
import Product from '../../components/home/Product/Product';

function HomeIndex() {
    return (
        <div className="container">
            <Navbar />
            <div className="content-main d-flex justify-content-center">
                <Routes>
                    <Route path="/" element={<h1>Home Page</h1>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/card" element={<h1>Card Page</h1>} />
                    {/* <Route path="*" element={<h1>Page Not Found</h1>} /> */}
                </Routes>

                <LoginIndex />

            </div>
            <Footer />
        </div>
    )
}

export default HomeIndex;
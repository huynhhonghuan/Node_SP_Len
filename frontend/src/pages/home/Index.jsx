import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import Navbar from '../../components/home/Navbar/Navbar';
import Footer from '../../components/home/Footer/Footer';

function HomeIndex() {
    return (
        <div className="container">
            <Navbar />
            {/* Your home page content */}
            <div className="content-main">
                <Footer />
            </div>
        </div>
    )
}

export default HomeIndex;
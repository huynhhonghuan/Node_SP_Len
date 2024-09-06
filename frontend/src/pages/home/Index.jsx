import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import Navbar from '../../components/home/Navbar/Navbar';

function HomeIndex() {
    return (
        <div className="container">
            <Navbar />
        </div>
    )
}

export default HomeIndex;
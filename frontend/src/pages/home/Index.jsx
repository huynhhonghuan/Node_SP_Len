import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Đây là cách import đúng
import './Index.css';
import Navbar from '../../components/home/Navbar/Navbar';
import Footer from '../../components/home/Footer/Footer';
import LoginIndex from '../../auth/index';
import About from '../../components/home/About/About';
import Product from '../../components/home/Product/Product';
import Home from '../../components/home/Home/Home';
import ProductDetail from '../../components/home/ProductDetail/ProductDetail';
import Card from '../../components/home/Card/Card';
import { getProductByType } from '../../services/ProductService';

function HomeIndex() {
    return (
        <div className="container">
            <Navbar />
            <div className="content-main">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/product" element={<Product />} />
                    <Route path="/product/tool" element={<Product data={getProductByType('tool')} />} />
                    <Route path="/product/wool" element={<Product />} />
                    <Route path="/product/product" element={<Product />} />
                    <Route path="/product/comboproduct" element={<Product />} />

                    <Route path="/product-detail/:id" element={<ProductDetail />} />

                    <Route path="/card" element={<Card />} />
                    {/* <Route path="*" element={<h1>Page Not Found</h1>} /> */}
                </Routes>

                <LoginIndex />

            </div>
            <Footer />
        </div>
    )
}

export default HomeIndex;
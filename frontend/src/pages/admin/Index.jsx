import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import Navbar from '../../components/admin/Navbar/Navbar';
import ListProduct from './Product/ListProduct';
import AddProduct from '../admin/Product/AddProduct'; // Đảm bảo đường dẫn đúng tới component AddProduct
import ListAccount from './Account/ListAccount';
import AddAccount from './Account/AddAccount';
import ListDiscount from './Discount/ListDiscount';
import AddDiscount from './Discount/AddDiscount';
import ListOrder from './Order/ListOrder';
import ListComboProduct from './ComboProduct/ListComboProduct';

function AdminIndex() {
    return (
        <div className="admin">
            <div className="admin-sidebar">
                <Sidebar />
            </div>
            <div className="admin-content">
                <Navbar />
                <div className="content">
                    <Routes>

                        <Route path="account" element={<ListAccount />} />
                        <Route path="account/create" element={<AddAccount />} />

                        <Route path="product" element={<ListProduct />} />
                        <Route path="product/create" element={<AddProduct />} />
                        {/* <Route path="product/update/:id" element={<UpdateProduct />} /> */}

                        <Route path="comboproduct" element={<ListComboProduct />} />

                        <Route path="discount" element={<ListDiscount />} />
                        <Route path="discount/create" element={<AddDiscount />} />

                        <Route path="order" element={<ListOrder />} />


                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminIndex;

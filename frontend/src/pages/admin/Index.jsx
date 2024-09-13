import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import Navbar from '../../components/admin/Navbar/Navbar';
// import ListProduct from './Product/ListProduct';
// import ListAccount from './Account/ListAccount';
// import ListDiscount from './Discount/ListDiscount';
// import ListOrder from './Order/ListOrder';
// import ListComboProduct from './ComboProduct/ListComboProduct';
// import CreateDiscount from './Discount/CreateDiscount';
import ListPage from './LCUD/ListPage';
import { UserPage } from '../../formschema/UserSchema';
import CreatePage from './LCUD/CreatePage';
import UpdatePage from './LCUD/UpdatePage';
import { DiscountPage } from '../../formschema/DiscountSchema';

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
                        <Route path="account" element={<ListPage pageConfig={UserPage['list']} />} />
                        <Route path="account/create" element={<CreatePage pageConfig={UserPage['create']} />} />
                        <Route path="account/update/:id" element={<UpdatePage pageConfig={UserPage['update']} />} />

                        <Route path="discount" element={<ListPage pageConfig={DiscountPage['list']} />} />
                        <Route path="discount/create" element={<CreatePage pageConfig={DiscountPage['create']} />} />
                        <Route path="discount/update/:id" element={<UpdatePage pageConfig={DiscountPage['update']} />} />

                        {/* <Route path="product" element={<ListProduct />} /> */}
                        {/* <Route path="product/create" element={<CreateAccount />} /> */}
                        {/* <Route path="product/update/:id" element={<UpdateProduct />} /> */}
                        {/* 
                        <Route path="comboproduct" element={<ListComboProduct />} />

                        <Route path="discount" element={<ListDiscount />} />
                        <Route path="discount/create" element={<CreateDiscount />} />

                        <Route path="order" element={<ListOrder />} /> */}

                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminIndex;

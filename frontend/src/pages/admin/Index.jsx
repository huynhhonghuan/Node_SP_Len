import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./index.css";
import Sidebar from '../../components/admin/Sidebar/Sidebar';
import Navbar from '../../components/admin/Navbar/Navbar';
import ListPage from './LCUD/ListPage';
import { UserPage } from '../../formdatas/UserSchema';
import CreatePage from './LCUD/CreatePage';
import UpdatePage from './LCUD/UpdatePage';
import { DiscountPage } from '../../formdatas/DiscountSchema';
import { ProductPage } from '../../formdatas/ProductSchema';
import { ComboProductPage } from '../../formdatas/ComboProductSchema';
import { OrderPage } from '../../formdatas/OrderSchema';
import { ChatPage } from '../../formdatas/ChatSchema';
import HomeAdmin from './Home/HomeAdmin';

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
                        <Route path="/" element={<HomeAdmin />} />

                        <Route path="account" element={<ListPage pageConfig={UserPage['list']} />} />
                        <Route path="account/create" element={<CreatePage pageConfig={UserPage['create']} />} />
                        <Route path="account/update/:id" element={<UpdatePage pageConfig={UserPage['update']} />} />

                        <Route path="discount" element={<ListPage pageConfig={DiscountPage['list']} />} />
                        <Route path="discount/create" element={<CreatePage pageConfig={DiscountPage['create']} />} />
                        <Route path="discount/update/:id" element={<UpdatePage pageConfig={DiscountPage['update']} />} />

                        <Route path="product" element={<ListPage pageConfig={ProductPage['list']} />} />
                        <Route path="product/create" element={<CreatePage pageConfig={ProductPage['create']} />} />
                        <Route path="product/update/:id" element={<UpdatePage pageConfig={ProductPage['update']} />} />

                        <Route path="comboproduct" element={<ListPage pageConfig={ComboProductPage['list']} />} />
                        <Route path="comboproduct/create" element={<CreatePage pageConfig={ComboProductPage['create']} />} />
                        <Route path="comboproduct/update/:id" element={<UpdatePage pageConfig={ComboProductPage['update']} />} />

                        <Route path="order" element={<ListPage pageConfig={OrderPage['list']} />} />
                        <Route path="order/create" element={<CreatePage pageConfig={OrderPage['create']} />} />
                        <Route path="order/update/:id" element={<UpdatePage pageConfig={OrderPage['update']} />} />

                        <Route path="chat" element={<ListPage pageConfig={ChatPage['list']} />} />

                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AdminIndex;

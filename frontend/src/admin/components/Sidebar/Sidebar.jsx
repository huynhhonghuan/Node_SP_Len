// import { Link } from "react-router-dom";
import React from "react";
import home_logo from "../../../admin/assets/admin-home.png"
import "./Sidebar.css"
import account_img from "../../../admin/assets/account.png"
import product_img from "../../../admin/assets/product.png"
import promotion_img from "../../../admin/assets/promotion.png"
import box_img from "../../../admin/assets/box.png"
import comment_img from "../../../admin/assets/comment.png"
import chatbot_img from "../../../admin/assets/chatbot.png"

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={home_logo} alt="" className="logo" />
                <h2 className="sidebar-title">Quản trị viên</h2>
            </div>
            <div className="sidebar-menu">
                <ul className="sidebar-links">
                    <li>
                        <img src={account_img} alt="" className="sidebar-icon" />
                        <span className="sidebar-span">Tài khoản</span>
                    </li>
                    <li>
                        <img src={product_img} alt="" className="sidebar-icon" />
                        <span className="sidebar-span">Sản phẩm</span>
                    </li>
                    <li>
                        <img src={promotion_img} alt="" className="sidebar-icon" />
                        <span className="sidebar-span">Khuyến mãi</span>
                    </li>
                    <li>
                        <img src={box_img} alt="" className="sidebar-icon" />
                        <span className="sidebar-span">Đơn hàng</span>
                    </li>
                    <li>
                        <img src={comment_img} alt="" className="sidebar-icon" />
                        <span className="sidebar-span">Đánh giá</span>
                    </li>
                    <li>
                        <img src={chatbot_img} alt="" className="sidebar-icon" />
                        <span className="sidebar-span">Chatbot</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar
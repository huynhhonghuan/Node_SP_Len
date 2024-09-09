// import { Link } from "react-router-dom";
import React from "react";
import home_logo from "../../../assets/images/admin/admin-home.png";
import "./Sidebar.css"
import account_img from "../../../assets/images/admin/account.png"
import product_img from "../../../assets/images/admin/product.png"
import promotion_img from "../../../assets/images/admin/promotion.png"
import box_img from "../../../assets/images/admin/box.png"
import comment_img from "../../../assets/images/admin/comment.png"
import chatbot_img from "../../../assets/images/admin/chatbot.png"
import { Link } from "react-router-dom";

const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <img src={home_logo} alt="" className="logo" />
                <h2 className="sidebar-title">Quản trị viên</h2>
            </div>
            <div className="sidebar-menu">
                <ul className="sidebar-links">
                    <Link to={'/admin/account'} style={{ textDecoration: "none" }}>

                        <li>
                            <img src={account_img} alt="" className="sidebar-icon" />
                            <span className="sidebar-span">Tài khoản</span>
                        </li>
                    </Link>
                    <Link to={'/admin/product'} style={{ textDecoration: "none" }}>
                        <li>
                            <img src={product_img} alt="" className="sidebar-icon" />
                            <span className="sidebar-span">Sản phẩm</span>
                        </li>
                    </Link>

                    <Link to={'/admin/comboproduct'} style={{ textDecoration: "none" }}>
                        <li>
                            <img src={product_img} alt="" className="sidebar-icon" />
                            <span className="sidebar-span">Combo Sản phẩm</span>
                        </li>
                    </Link>

                    <Link to={'/admin/discount'} style={{ textDecoration: "none" }}>
                        <li>
                            <img src={promotion_img} alt="" className="sidebar-icon" />
                            <span className="sidebar-span">Khuyến mãi</span>
                        </li>
                    </Link>
                    <Link to={'/admin/order'} style={{ textDecoration: "none" }}>

                        <li>
                            <img src={box_img} alt="" className="sidebar-icon" />
                            <span className="sidebar-span">Đơn hàng</span>
                        </li>
                    </Link>
                    {/* <li>
                        <img src={comment_img} alt="" className="sidebar-icon" />
                        <span className="sidebar-span">Đánh giá</span>
                    </li> */}
                    <li>
                        <img src={chatbot_img} alt="" className="sidebar-icon" />
                        <span className="sidebar-span">Nhắn tin</span>
                    </li>
                </ul>
            </div>
        </div>
    )
}
export default Sidebar
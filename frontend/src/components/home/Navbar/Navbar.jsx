import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const Navbar = () => {
    const [isNavbarLeftVisible, setNavbarLeftVisible] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const navbarLeftRef = useRef(null);
    const buttonRef = useRef(null);
    const [userRole, setUserRole] = useState(null); // Quản lý loại tài khoản người dùng


    const toggleNavbarLeft = () => {
        setNavbarLeftVisible(!isNavbarLeftVisible);
    };

    const handleClickOutside = (event) => {
        if (navbarLeftRef.current && !navbarLeftRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setNavbarLeftVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const calculateCartCount = () => {
        const cartData = JSON.parse(localStorage.getItem('cart')) || [];
        const totalCount = cartData.length;
        setCartCount(totalCount);
    };


    const checkUserRole = async () => {
        // Giả sử role được lưu trong localStorage
        const storedUserRole = await Cookies.get('token');
        if (storedUserRole) {
            const user = await jwtDecode(storedUserRole);
            setUserRole(user.role);
        }
    };

    useEffect(() => {
        calculateCartCount(); // Tính số lượng sản phẩm khi component mount

        checkUserRole(); // Kiểm tra vai trò người dùng

        // Lắng nghe sự kiện storage
        const handleStorageChange = (event) => {
            if (event.key === 'cart') {
                calculateCartCount();
            }
        };

        window.addEventListener('storage', handleStorageChange);

        // Hủy sự kiện khi component bị unmount
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, [cartCount]);

    return (
        <>
            <div className="navbar-main d-flex flex-column">
                <div className="navbar-title text-center text-light py-2">
                    <span className="text-uppercase fw-bold">Tiệm nhà len - đan cảm xúc - dệt niềm tin</span>
                </div>
                <div className="navbar-content-1 d-flex align-items-center justify-content-between mt-3">
                    <div className="navbar-content-home">
                        <Link to="/" className="text-secondary p-2 rounded-circle fs-4" style={{ backgroundColor: "gold" }}>
                            <i className="fa-solid fa-house-chimney text-light"></i>
                        </Link>
                    </div>
                    <div className="navbar-content-search">
                        <input type="text" placeholder="Tìm kiếm..." className="form-control me-2 px-4 rounded-pill" />
                    </div>
                    <ul className="d-flex flex-row list-unstyled mb-0">
                        <li className="me-2 fs-5 pe-3 border-end">
                            <Link to="/" className="text-warning"><i className="fa-regular fa-envelope"></i></Link>
                        </li>
                        <li className="mx-2 fs-5 pe-3 border-end">
                            <Link to="/about" className="text-warning"><i className="fa-regular fa-clock"></i></Link>
                        </li>
                        <li className="mx-2 fs-5">
                            <Link to="/contact" className="text-warning"><i className="fa-solid fa-phone"></i></Link>
                        </li>
                        <li className="mx-2 fs-5">
                            {/* Điều chỉnh Link dựa trên userRole */}
                            {userRole === 'admin' ? (
                                <Link to="/admin" className="text-warning"><i className="fa-solid fa-user-large"></i></Link>
                            ) : userRole === 'customer' ? (
                                <Link to="/customer" className="text-warning"><i className="fa-solid fa-user-large"></i></Link>
                            ) : userRole === 'staff' ? (
                                <Link to="/staff" className="text-warning"><i className="fa-solid fa-user-large"></i></Link>
                            ) : (
                                <Link to="/login" className="text-warning"><i className="fa-solid fa-user-large"></i></Link>
                            )}
                        </li>
                        <li className="mx-2 fs-5 bg-warning px-2 rounded-circle position-relative">
                            <Link to="/card" className="text-light"><i className="fa-solid fa-cart-plus"></i></Link>
                            {cartCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {cartCount}
                                </span>
                            )}
                        </li>
                    </ul>
                </div>

                <div className="navbar-content-2 d-flex align-items-center justify-content-start mt-3 py-1">
                    <div className="col-2 col-md-4">
                        <button className="btn fs-5 text-secondary" type="button" onClick={toggleNavbarLeft} ref={buttonRef}>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                    <div className="navbar-content-2-menu col-10 col-md-8">
                        <Link to="/" className="text-dark text-uppercase fw-bold text-decoration-none me-5">
                            Trang chủ
                        </Link>
                        <Link to="/about" className="text-dark text-uppercase fw-bold text-decoration-none me-5">
                            Giới thiệu
                        </Link>
                        <div className="dropdown-wrapper-main position-relative d-inline-block">
                            <Link to="/product" className="text-dark text-uppercase fw-bold text-decoration-none me-5">
                                Sản phẩm <i className="fa-solid fa-chevron-down"></i>
                            </Link>
                            <div className="dropdown-menu-main position-absolute bg-white shadow-sm p-2 mt-2 border border-2 border-warning">
                                <Link to="/product/tool" className="dropdown-item-main text-secondary py-3">
                                    Dụng cụ
                                </Link>
                                <Link to="/product/wool" className="dropdown-item-main text-secondary py-3">
                                    Len thô
                                </Link>
                                <Link to="/product/product" className="dropdown-item-main text-secondary py-3">
                                    Sản phẩm
                                </Link>
                                {/* <Link to="/product/comboproduct" className="dropdown-item-main text-secondary py-3">
                                    Combo sản phẩm
                                </Link> */}
                            </div>
                        </div>
                        <Link to="/card" className="text-dark text-uppercase fw-bold text-decoration-none">
                            Giỏ hàng
                        </Link>
                    </div>
                    <div className="navbar-content-2-search col-10 col-md-8">
                        <input type="text" placeholder="Tìm kiếm..." className="form-control me-2 px-4 rounded-pill" />
                    </div>
                </div>
            </div>

            <div
                className={`navbar-left ${isNavbarLeftVisible ? 'show' : ''}`}
                ref={navbarLeftRef}
            >
                <div className="navbar-left-search mx-2 pt-5 pb-3">
                    <input type="text" placeholder="Tìm kiếm..." className="form-control me-2 px-2 rounded-pill" />
                </div>
                <div className="navbar-left-link d-flex flex-column justify-content-center align-items-start">
                    <div className="border-bottom border-secondary w-100 py-4 ps-3">
                        <Link to="/" className="text-secondary text-decoration-none fs-6 fw-bold text-uppercase">
                            Trang chủ
                        </Link>
                    </div>
                    <div className="border-bottom border-secondary w-100 py-4 ps-3">
                        <Link to="/about" className="text-secondary text-decoration-none fs-6 fw-bold text-uppercase">
                            Giới thiệu
                        </Link>
                    </div>
                    <div className="border-bottom border-secondary w-100 py-4 ps-3 position-relative">
                        <div className="dropdown-wrapper-left-custom me-3">
                            <Link to="/product" className="text-secondary text-decoration-none fs-6 fw-bold text-uppercase">
                                Sản phẩm <i className="fa-solid fa-chevron-down"></i>
                            </Link>
                            <div className="dropdown-menu-left-custom bg-white shadow-sm p-2 mt-2 border border-2 border">
                                <Link to="/product/tool" className="dropdown-item-left-custom text-secondary py-3">
                                    Dụng cụ
                                </Link>
                                <Link to="/product/wool" className="dropdown-item-left-custom text-secondary py-3">
                                    Len thô
                                </Link>
                                <Link to="/product/product" className="dropdown-item-left-custom text-secondary py-3">
                                    Sản phẩm
                                </Link>
                                {/* <Link to="/product/comboproduct" className="dropdown-item-left-custom text-secondary py-3">
                                    Combo sản phẩm
                                </Link> */}
                            </div>
                        </div>
                    </div>

                    <div className="border-bottom border-secondary w-100 py-4 ps-3">
                        <Link to="/card" className="text-secondary text-decoration-none fs-6 fw-bold text-uppercase">
                            Giỏ hàng
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;

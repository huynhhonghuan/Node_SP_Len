import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isNavbarLeftVisible, setNavbarLeftVisible] = useState(false);
    const navbarLeftRef = useRef(null);
    const buttonRef = useRef(null);  // Tạo một ref cho nút

    const toggleNavbarLeft = () => {
        setNavbarLeftVisible(!isNavbarLeftVisible);
    };

    // Hàm xử lý khi nhấn bên ngoài navbar-left
    const handleClickOutside = (event) => {
        // Kiểm tra nếu click bên ngoài navbar-left và không phải là click trên nút mở sidebar
        if (navbarLeftRef.current && !navbarLeftRef.current.contains(event.target) &&
            buttonRef.current && !buttonRef.current.contains(event.target)) {
            setNavbarLeftVisible(false);
        }
    };

    useEffect(() => {
        // Thêm sự kiện khi component được mount
        document.addEventListener('mousedown', handleClickOutside);

        // Hủy sự kiện khi component bị unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <>
            <div className="navbar-main d-flex flex-column">
                <div className="navbar-title text-center text-light py-2">
                    <span className="text-uppercase fw-bold">Tiệm nhà len - đan cảm xúc - dệt niềm tin</span>
                </div>
                <div className="navbar-content-1 d-flex align-items-center justify-content-between mt-3">
                    <div className="navbar-content-home">
                        <Link to="/" className="text-warning bg-secondary p-2 rounded-circle">
                            <i className="fa-solid fa-house-chimney"></i>
                        </Link>
                    </div>
                    <div className="navbar-content-search d-flex align-items-center">
                        <input type="text" placeholder="Tìm kiếm..." className="form-control me-2 w-100 px-5" />
                        <button className="btn btn-primary">Search</button>
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
                            <Link to="/contact" className="text-warning"><i className="fa-solid fa-user-large"></i></Link>
                        </li>
                        <li className="mx-2 fs-5 bg-warning px-2 rounded-circle">
                            <Link to="/contact" className="text-light"><i className="fa-solid fa-cart-plus"></i></Link>
                        </li>
                    </ul>
                </div>

                <div className="navbar-content-2 d-flex align-items-center justify-content-start mt-3 py-3">
                    <div className="col-2 col-md-4">
                        {/* Nút mở sidebar với ref */}
                        <button className="btn" type="button"
                            onClick={toggleNavbarLeft}
                            ref={buttonRef}>
                            <i className="fa-solid fa-bars"></i>
                        </button>
                    </div>
                    <div className="col-10 col-md-8">
                        <Link to="/" className="text-dark text-uppercase fw-bold text-decoration-none me-5">
                            Trang chủ
                        </Link>
                        <Link to="/" className="text-dark text-uppercase fw-bold text-decoration-none me-5">
                            Giới thiệu
                        </Link>
                        <Link to="/" className="text-dark text-uppercase fw-bold text-decoration-none me-5">
                            Sản phẩm <i className="fa-solid fa-chevron-down"></i>
                        </Link>
                        <Link to="/" className="text-dark text-uppercase fw-bold text-decoration-none me-5">
                            Liên hệ
                        </Link>
                        <Link to="/" className="text-dark text-uppercase fw-bold text-decoration-none">
                            Giỏ hàng
                        </Link>
                    </div>
                </div>
            </div>

            {/* Phần menu sidebar trái */}
            <div
                className={`navbar-left ${isNavbarLeftVisible ? 'show' : ''}`}
                ref={navbarLeftRef}
            >
                Nội dung thanh sidebar
            </div>
        </>
    );
};

export default Navbar;

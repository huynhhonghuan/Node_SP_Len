import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css';
import { validateEmail, validatePassword } from '../../utils/validation';
import { login } from '../../services/authService'; // Thêm validateToken
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
    const [email, setEmail] = useState('admin@example.com');
    const [password, setPassword] = useState('12345678');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate();

    // Kiểm tra token khi component được mount
    // useEffect(() => {
    //     const checkToken = async () => {
    //         const token = await Cookies.get('token'); // Lấy token từ localStorage
    //         if (token) {
    //             try {
    //                 const data = await jwtDecode(token); // Xác thực token
    //                 if (data.role === 'admin') {
    //                     navigate('/admin');
    //                 } else if (data.role === 'customer') {
    //                     navigate('/customer');
    //                 }
    //             } catch (error) {
    //                 console.log('Token không hợp lệ:', error);
    //                 // Xóa token nếu không hợp lệ
    //                 localStorage.removeItem('token');
    //             }
    //         }
    //     };

    //     checkToken();
    // }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);

        if (!isEmailValid) {
            setEmailError('Email không hợp lệ.');
            return;
        } else {
            setEmailError('');
        }

        if (!isPasswordValid) {
            setPasswordError('Mật khẩu phải có ít nhất 8 ký tự.');
            return;
        } else {
            setPasswordError('');
        }

        try {
            const data = await login(email, password); // Gọi API đăng nhập
            localStorage.setItem('token', data.token); // Lưu token vào localStorage

            // Chuyển hướng người dùng dựa trên vai trò (admin hoặc user)
            if (data.user.role === 'admin') {
                navigate('/admin');
            } else if (data.user.role === 'customer') {
                navigate('/customer');
            } else if (data.user.role === 'staff') {
                navigate('/staff');
            }
            else if (data.user.role === 'shipper') {
                navigate('/shipper');
            }
            else {
                setLoginError('Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.');
                return;
            }

        } catch (error) {
            setLoginError('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <div className="login">
            <span className="login-title">Đăng nhập</span>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="login-input"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder='Email'
                        required
                        autoComplete="username"
                    />
                    {emailError && <p style={{ color: "#d82c26" }}>{emailError}</p>}
                </div>
                <div>
                    <input className="login-input"
                        type="password"
                        value={password}
                        placeholder='Password'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    {passwordError && <p style={{ color: "#d82c26" }}>{passwordError}</p>}
                </div>
                <div className="login-info">
                    <input type="checkbox" id="rememberMe" name="rememberMe" />
                    <label htmlFor="rememberMe">Ghi nhớ</label>
                    <a href="#" className="forgot-password">Quên mật khẩu?</a>
                </div>
                {loginError && <p>{loginError}</p>}
                <button className='login-button' type="submit">Đăng nhập</button>
            </form>

            <Link to={'/resgister'} className='resgister'>Nếu chưa có tài khoản? Đăng ký!</Link>
        </div>
    );
};

export default LoginForm;

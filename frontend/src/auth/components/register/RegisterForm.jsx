import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../utils/validation';
import { login } from '../../services/authService';

const ResgisterForm = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [loginError, setLoginError] = useState('');

    const navigate = useNavigate(); // Khởi tạo useNavigate

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
            // Chuyển hướng người dùng dựa trên vai trò (admin hoặc user)
            if (data.user.role === 'admin') {
                navigate('/admin-home'); // Điều hướng đến trang của admin
            } else if (data.user.role === 'customer') {
                navigate('/customer-home'); // Điều hướng đến trang của user
            } else {
                setLoginError('Tài khoản hoặc mật khẩu không đúng. Vui lòng thử lại.'); // Trả về thông báo đăng nhập thất bại nếu vai trò người dùng không h��p lệ.
                return;
            }

        } catch (error) {
            // console.log(error);
            setLoginError('Đăng nhập thất bại. Vui lòng thử lại.');
        }
    }
    return (
        <div className="login">
            <span className="login-title">Đăng ký tài khoản</span>
            <form onSubmit={handleSubmit}>
                <div>
                    <input className="login-input"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='Họ và tên'
                        required
                        autoComplete="name"
                    />
                    {nameError && <p style={{ color: "#d82c26" }}>{nameError}</p>}
                </div>

                <div>
                    <input className="login-input"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder='Số điện thoại'
                        required
                        autoComplete="phone"
                    />
                    {phoneError && <p style={{ color: "#d82c26" }}>{phoneError}</p>}
                </div>

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
                        placeholder='Mật khẩu'
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    {passwordError && <p style={{ color: "#d82c26" }}>{passwordError}</p>}
                </div>

                <div>
                    <input className="login-input"
                        type="password"
                        value={confirmPassword}
                        placeholder='Xác nhận mật khẩu'
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                    {confirmPasswordError && <p style={{ color: "#d82c26" }}>{confirmPasswordError}</p>}
                </div>

                {loginError && <p>{loginError}</p>}
                <button className='login-button' type="submit">Đăng ký</button>
            </form>

            <Link to={'/login'} className='resgister'>Đã có tài khoản! Đăng nhập ngay.</Link>

        </div>
    )
}

export default ResgisterForm

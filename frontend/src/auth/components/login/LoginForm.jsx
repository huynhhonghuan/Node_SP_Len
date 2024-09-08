import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './LoginForm.css'
import { validateEmail, validatePassword } from '../../utils/validation';
import { login } from '../../services/authService';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
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
                navigate('/admin'); // Điều hướng đến trang của admin
            } else if (data.user.role === 'customer') {
                navigate('/customer'); // Điều hướng đến trang của user
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
                    <label htmlFor="rememberMe">Remember me</label>
                    <a href="#" className="forgot-password">Forgot password?</a>
                </div>
                {loginError && <p>{loginError}</p>}
                <button className='login-button' type="submit">Đăng nhập</button>
            </form>

            <Link to={'/resgister'} className='resgister'>Don't have an account? Sign up now!</Link>

        </div>
    )
}

export default LoginForm

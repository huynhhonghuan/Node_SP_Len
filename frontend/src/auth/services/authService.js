// Đây là ví dụ giả định, bạn cần thay đổi để phù hợp với API thực tế
import axios from 'axios';
import Cookies from 'js-cookie';

export const getToken = () => {
    return Cookies.get('token'); // Lấy token từ cookie
};

export const login = async (email, password) => {

    console.log(`${import.meta.env.VITE_API_URL}`);

    const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password },
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    );
    Cookies.set('token', response.data.token, { expires: 1 }); // Lưu token vào cookie
    return response.data;
};

export const logout = async () => {
    Cookies.remove('token'); // Xóa token khỏi cookie
    return await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
};

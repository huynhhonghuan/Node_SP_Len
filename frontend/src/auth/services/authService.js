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

    await Cookies.set('token', response.data.token, { expires: 1 / 24 }); // Lưu token vào cookie

    return response.data;
};

export const logout = async () => {
    try {
        // Xóa token khỏi cookie
        Cookies.remove('token');

        // Gửi yêu cầu POST đến endpoint logout với token (nếu cần)
        await axios.get(`${import.meta.env.VITE_API_URL}/auth/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${Cookies.get('token')}`, // Thêm header nếu cần
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error logging out:', error);
        throw error;
    }
};

// Hàm đăng ký thành viên
export const register = async (name, phone, email, password) => {
    try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { name, email, phone, password },
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        return response.data;
    }
    catch (error) {
        console.error('Error registering:', error);
        throw error;
    }
};
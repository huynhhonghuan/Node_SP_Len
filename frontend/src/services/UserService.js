import axios from "axios";
import { token } from "./GetToken";

// Lấy danh sách người dùng

export const getAllUsers = async () => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`  // Truyền token đã lấy được vào đây
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

// Tìm kiếm người dùng theo ID

export const getUserById = async (userId) => {
    try {
        const authToken = await token();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/${userId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`  // Truyền token đã lấy được vào đây
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
    }
};

// Thêm mới người dùng

export const CreateUser = async (user) => {
    try {
        const authToken = await token();

        // console.log(authToken, user);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/user`, user, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`  // Truyền token đã lấy được vào đây
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error adding user:', error);
        throw error;
    }
};
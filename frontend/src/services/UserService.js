import axios from "axios";
import { token } from "./GetToken";

// Lấy danh sách người dùng

export const getAllUsers = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/user`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};
import axios from "axios";
import { token } from "./GetToken";

// Lấy danh sách mã giảm giá

export const getAllDiscounts = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/discount`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
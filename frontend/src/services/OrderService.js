import axios from "axios";
import { token } from "./GetToken";

// Lấy danh sách đơn hàng

export const getAllOrders = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Lỗi khi lấy danh sách đơn hàng");
    }
};
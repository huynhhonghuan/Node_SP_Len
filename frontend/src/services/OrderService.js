import axios from "axios";
import { token } from "./GetToken";

// Lấy danh sách đơn hàng

export const getAllOrders = async () => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw new Error("Lỗi khi lấy danh sách đơn hàng");
    }
};

// Tạo mới đơn hàng

export const createOrder = async (order) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();
        const response = await axios.post(
            `${import.meta.env.VITE_API_URL}/order`,
            order,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw new Error("L��i khi tạo mới đơn hàng");
    }
};
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

// Lấy đơn hàng theo ID

export const getOrderById = async (orderId) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/order/${orderId}`,
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
        throw new Error("L��i khi lấy đơn hàng theo ID");
    }
};

// Lấy danh sách đơn hàng theo UserId

export const getOrdersByUserId = async (userId) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();
        const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/order/user/${userId}`,
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
        throw new Error("Lỗi khi lấy danh sách đơn hàng theo UserId");
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

// Cập nhật đơn hàng

export const updateOrder = async (orderId, order) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();
        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/order/${orderId}`,
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
        throw new Error("L��i khi cập nhật đơn hàng");
    }
};

// Xóa đơn hàng

export const deleteOrder = async (orderId) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();
        await axios.delete(
            `${import.meta.env.VITE_API_URL}/order/${orderId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
    } catch (error) {
        console.error(error);
        throw new Error("L��i khi xóa đơn hàng");
    }
};
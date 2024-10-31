import axios from "axios";
import { token } from "./GetToken";

// Lấy danh thống kê tài khoản

export const getAccountStatistics = async () => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/statistical/user`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        // Trả về kết quả
        return response.data.data;
    }
    catch (error) {
        // Xử lý l��i nếu có
        console.error(error);
    }
}

// Lấy danh sách thống kê sản phẩm 

export const getProductStatistics = async () => {
    try {
        // Gọi hàm token và chủ yếu lấy giá trị token
        const authToken = await token();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/statistical/product`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        // Trả về kết quả
        return response.data.data;
    }
    catch (error) {
        // Xử lý l��i nếu có
        console.error(error);
    }
}

// Lấy danh sách thống kê đơn hàng

export const getOrderStatistics = async () => {
    try {
        // Gọi hàm token và chủ yếu lấy giá trị token
        const authToken = await token();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/statistical/order`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        // Trả về kết quả
        return response.data.data;
    }
    catch (error) {
        // Xử lý l��i nếu có
        console.error(error);
    }
}
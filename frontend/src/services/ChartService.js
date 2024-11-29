import axios from "axios";
import { token } from "./GetToken";

// Lấy số lượng tài khoản, sản phẩm, đơn hàng

export const getCountStatistics = async () => {
    try {
        // Gọi hàm token và chủ yếu lấy giá trị token
        const authToken = await token();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/statistical/count`, {
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

export const getOrderStatistics = async ({ startDate, endDate }) => {
    try {
        // Gọi hàm token và chủ yếu lấy giá trị token
        const authToken = await token();
        const data = {
            startDate,
            endDate
        };
        console.log(data);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/statistical/order`, {
            params: { startDate, endDate },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        console.log(response.data.data);
        // Trả về kết quả
        return response.data.data;
    }
    catch (error) {
        // Xử lý l��i nếu có
        console.error(error);
    }
}

// Thống kê doanh thu đơn hàng
export const getRevenueOrderStatistics = async ({ startDate, endDate }) => {
    try {
        // Gọi hàm token và chủ yếu lấy giá trị token
        const authToken = await token();
        const data = {
            startDate,
            endDate
        };
        console.log(data);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/statistical/revenue-order`, {
            params: { startDate, endDate },
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });

        console.log(response.data.data);
        // Trả về kết quả
        return response.data.data;
    }
    catch (error) {
        // Xử lý l��i nếu có
        console.error(error);
    }
}
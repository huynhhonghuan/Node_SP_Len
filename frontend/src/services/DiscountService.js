import axios from "axios";
import { token } from "./GetToken";

// Lấy danh sách mã giảm giá

export const getAllDiscounts = async () => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/discount`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Tìm kiếm mã giảm giá theo ID

export const getDiscountById = async (discountId) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/discount/${discountId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

// Thêm mới mã giảm giá

export const createDiscount = async (discount) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/discount`, discount, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Cập nhật mã giảm giá

export const updateDiscount = async (discountId, discount) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/discount/${discountId}`,
            discount,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

// Xóa mã giảm giá

export const deleteDiscount = async (discountId) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/discount/${discountId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
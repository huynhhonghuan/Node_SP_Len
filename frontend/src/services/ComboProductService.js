import axios from "axios";
import { token } from "./GetToken";

// Lấy danh sách Combo sản phẩm

export const getAllComboProducts = async () => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/comboproduct`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });

        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};

// Tìm kiếm combo sản phẩm theo ID

export const getComboProductById = async (comboProductId) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/comboproduct/${comboProductId}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`
            }
        });

        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;

    }
};

// Thêm mới Combo sản phẩm

export const createComboProduct = async (comboProduct) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/comboproduct`, comboProduct,
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
        throw error;

    }
};

// Cập nhật Combo sản phẩm

export const updateComboProduct = async (comboProductId, comboProduct) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.put(
            `${import.meta.env.VITE_API_URL}/comboproduct/${comboProductId}`,
            comboProduct,
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
        throw error;

    }
};

// Xóa Combo sản phẩm

export const deleteComboProduct = async (comboProductId) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        await axios.delete(
            `${import.meta.env.VITE_API_URL}/comboproduct/${comboProductId}`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );
    } catch (error) {
        console.error(error);
        throw error;

    }
};
import axios from 'axios';
import { token } from './GetToken';

export const getAllProducts = async () => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();

        // Gửi yêu cầu đến API để lấy danh sách sản phẩm
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getProductById = async (productId) => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createProduct = async (product) => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/product`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateProduct = async (productId, product) => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/product/${productId}`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        // Gọi hàm token và chờ lấy giá trị token
        const authToken = await token();
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
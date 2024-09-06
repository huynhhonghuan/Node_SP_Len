import axios from 'axios';
import { token } from './GetToken';

export const getAllProducts = async () => {
    try {
        // Lấy token từ cookie sử dụng js-cookie
        console.log(`${import.meta.env.VITE_API_URL}/product`);
        // Gửi yêu cầu đến API để lấy danh sách sản phẩm
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getProductById = async (productId) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const createProduct = async (product) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/product`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateProduct = async (productId, product) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_API_URL}/product/${productId}`, product, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteProduct = async (productId) => {
    try {
        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/product/${productId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
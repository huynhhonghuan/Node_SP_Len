import axios from 'axios';
import { token } from './GetToken';
import { deleteImage, LogicCreateImage, LogicDeleteImage, LogicUpdateImage, uploadImage } from './UploadImage';

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

export const getProductByType = async (type) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/type/${type}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getProductNewByUpdateAt = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/new`, {
            headers: {
                'Content-Type': 'application/json',
                // Không cần gửi token nếu không yêu cầu xác thực
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getProductBestSeller = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/bestseller`, {
            headers: {
                'Content-Type': 'application/json',
                // Không cần gửi token nếu không yêu cầu xác thực
            }
        });
        return response.data.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getProductByCommentAndUser = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/product/commentanduser`, {
            headers: {
                'Content-Type': 'application/json',
                // Không cần gửi token nếu không yêu cầu xác thực
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

        const data = await LogicCreateImage(product);

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/product`, data, {
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

        const oldProduct = await getProductById(productId);

        const data = await LogicUpdateImage(product, oldProduct);

        const response = await axios.put(`${import.meta.env.VITE_API_URL}/product/${productId}`, data, {
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

        const oldProduct = await getProductById(productId);

        await LogicDeleteImage(oldProduct);

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

export const transformOptionsForProduct = async () => {
    const products = await getAllProducts();
    return products.map(product => ({
        value: product._id,  // Giá trị cho trường select
        label: product.name // Tên hiển thị
    }));
};

export const transformProductsToOptions = async (productId) => {
    // Giả sử bạn có API hoặc service để lấy các tùy chọn cho sản phẩm
    const products = await getProductById(productId);
    const options = products.options; // Danh sách tùy chọn sản phẩm
    return options.map((option, index) => ({
        value: option._id,
        label: `Phân bản ${index + 1}`
    }));
};
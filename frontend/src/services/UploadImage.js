import axios from "axios";
import { token } from "./GetToken";

// Gọi Api để upload hình ảnh

export const uploadImage = async (formData) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/image/upload`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Đảm bảo rằng bạn đang gửi đúng định dạng
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Thay thế hình ảnh
export const replaceImage = async (formData) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.put(`${import.meta.env.VITE_API_URL}/image/replace`, formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${authToken}`
                }
            }
        );

        return response.data;
    } catch (error) {
        throw error;
    }
};

// Xóa hình ảnh
export const deleteImage = async (formData) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        console.log(authToken);

        const response = await axios.delete(`${import.meta.env.VITE_API_URL}/image/delete`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                params: {
                    image: formData
                }
            }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};
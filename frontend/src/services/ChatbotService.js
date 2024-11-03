import axios from "axios";
import { token } from "./GetToken";

// Lấy dang sách tin nhắn

export const getAllChat = async () => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/chat`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        });

        return response.data.data;
    } catch (error) {
        console.error(error);
    }
};

export const getQuestion = async (question) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/chatbot`, question, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${authToken}`,
            },
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
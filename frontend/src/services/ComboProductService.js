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

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
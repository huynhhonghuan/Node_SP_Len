import axios from "axios";
import { token } from "./GetToken";

// Lấy danh sách Combo sản phẩm

export const getAllComboProducts = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/comboproduct`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });

        return response.data;
    } catch (error) {
        console.error(error);
    }
};
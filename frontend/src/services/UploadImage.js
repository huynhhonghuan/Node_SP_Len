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

// Xóa hình ảnh
export const deleteImage = async (formData) => {
    try {
        // Gọi hàm token và ch�� lấy giá trị token
        const authToken = await token();

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

// Xử lý logic hình ảnh cho dữu liệu trước khi thêm
export const LogicCreateImage = async (data) => {
    for (const key in data) {
        if (key === 'image') {
            const image = new FormData();
            image.append(key, data[key]);
            data[key] = await uploadImage(image).then((response) => response.file.path);
        }
        if (Array.isArray(data[key])) {
            // Đổi tên biến key bên trong vòng lặp thứ hai để tránh xung đột
            for (const index in data[key]) {
                if (data[key][index].image) {  // Kiểm tra đúng thuộc tính "image" của phần tử trong mảng
                    const image = new FormData();
                    console.log(data[key][index].image);
                    image.append('image', data[key][index].image);
                    data[key][index].image = await uploadImage(image).then((response) => response.file.path);
                }
            }
        }
    }
    return data;
}

// Xử lý logic hình ảnh khi cập nhật
export const LogicUpdateImage = async (data, olddata) => {
    // Duyệt qua tất cả các trường trong dữ liệu mới
    for (const key in data) {
        // Xử lý nếu trường là hình ảnh đơn lẻ
        if (key === 'image' && data[key] !== olddata[key]) {
            // Nếu hình ảnh mới khác với hình ảnh cũ, xóa hình ảnh cũ
            if (olddata[key]) {
                await deleteImage(olddata[key]);
            }

            // Upload hình ảnh mới
            const image = new FormData();
            image.append(key, data[key]);
            data[key] = await uploadImage(image).then((response) => response.file.path);
        }

        // Xử lý nếu trường là một mảng (ví dụ: các phần tử trong form có nhiều hình ảnh)
        if (Array.isArray(data[key])) {
            for (const index in data[key]) {
                // Kiểm tra nếu phần tử trong mảng có trường "image" và hình ảnh mới khác với cũ
                if (data[key][index].image && data[key][index].image !== olddata[key][index].image) {
                    // Xóa hình ảnh cũ nếu có
                    if (olddata[key][index].image) {
                        await deleteImage(olddata[key][index].image);
                    }

                    // Upload hình ảnh mới
                    const image = new FormData();
                    image.append('image', data[key][index].image);
                    data[key][index].image = await uploadImage(image).then((response) => response.file.path);
                }
            }
        }
    }

    // Trả về dữ liệu sau khi xử lý hình ảnh
    return data;
};

// Xử lý xóa hình ảnh từ dữ liệu cũ
export const LogicDeleteImage = async (olddata) => {
    try {
        for (const key in olddata) {
            // Xử lý nếu trường là hình ảnh đơn lẻ
            if (key === 'image' && olddata[key]) {
                await deleteImage(olddata[key]);
            }

            // Xử lý nếu trường là một mảng (ví dụ: các phần tử trong form có nhiều hình ảnh)
            if (Array.isArray(olddata[key])) {
                for (const index in olddata[key]) {
                    // Kiểm tra nếu phần tử trong mảng có trường "image"
                    if (olddata[key][index].image) {
                        await deleteImage(olddata[key][index].image);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error deleting images:', error);
    }
};

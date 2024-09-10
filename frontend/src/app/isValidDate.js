// Hàm kiểm tra nếu giá trị là ngày
export const isValidDate = (value) => {
    // Nếu giá trị là chuỗi và có thể chuyển thành Date thì là ngày hợp lệ
    return typeof value === 'string' && !isNaN(Date.parse(value));
};
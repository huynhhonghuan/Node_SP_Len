// // Hàm kiểm tra nếu giá trị là URL hình ảnh
// export const isImageURL = (url) => {
//     return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://')) && /\.(jpg|jpeg|png|gif)$/.test(url);
// };
export const isImageURL = (url) => {
    // Kiểm tra xem giá trị có phải là chuỗi không
    if (typeof url !== 'string') {
        return false;
    }

    // Kiểm tra xem URL có bắt đầu bằng http:// hoặc https:// không
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return false;
    }

    // Regex để kiểm tra các đuôi hình ảnh phổ biến và cũng xử lý các tham số truy vấn trong URL
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff)(\?.*)?$/i;
    return imageRegex.test(url);
};
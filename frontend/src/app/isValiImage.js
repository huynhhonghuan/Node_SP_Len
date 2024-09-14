// // Hàm kiểm tra nếu giá trị là URL hình ảnh
// export const isImageURL = (url) => {
//     return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://')) && /\.(jpg|jpeg|png|gif)$/.test(url);
// };
export const isImageURL = (url) => {
    // Kiểm tra xem giá trị có phải là chuỗi không
    if (typeof url !== 'string') {
        return false;
    }

    // Bỏ kiểm tra giao thức http/https

    // Regex để kiểm tra đuôi hình ảnh phổ biến và các tham số truy vấn
    const imageRegex = /\.(jpg|jpeg|png|gif|bmp|webp|svg|tiff|ico)(\?.*)?$/i;

    // Kiểm tra URL xem có đúng định dạng ảnh không
    return imageRegex.test(url);
};

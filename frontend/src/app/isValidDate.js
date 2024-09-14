// Hàm kiểm tra nếu giá trị là ngày
export const isValidDate = (value) => {
    // Kiểm tra nếu giá trị là chuỗi
    if (typeof value !== 'string') {
        return false;
    }

    // Biểu thức chính quy để kiểm tra định dạng ISO 8601 cơ bản
    const iso8601Regex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{1,3})?Z$/;

    // Kiểm tra định dạng của giá trị với regex
    if (!iso8601Regex.test(value)) {
        return false;
    }

    // Chuyển giá trị thành đối tượng Date
    const parsedDate = new Date(value);

    // Kiểm tra nếu parsedDate là một ngày hợp lệ
    return !isNaN(parsedDate.getTime());
};

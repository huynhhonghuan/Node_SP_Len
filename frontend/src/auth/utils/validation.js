export const validateEmail = (email) => {
    // Kiểm tra định dạng email
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

export const validatePassword = (password) => {
    // Kiểm tra mật khẩu, ví dụ: ít nhất 6 ký tự
    return password.length >= 6;
};

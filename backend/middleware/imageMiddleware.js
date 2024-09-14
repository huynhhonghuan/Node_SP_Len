const multer = require('multer');
const path = require('path');

// Cấu hình Multer để lưu trữ file ảnh
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'assets/images');  // Thư mục lưu trữ ảnh
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));  // Đặt tên file với thời gian hiện tại
    }
});

// Kiểm tra định dạng file (chỉ chấp nhận file ảnh)
const fileFilter = (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png|gif/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb(new Error('Chỉ hỗ trợ định dạng ảnh: JPEG, PNG, GIF'));
    }
};

// Middleware Multer
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },  // Giới hạn kích thước file 5MB
    fileFilter: fileFilter
});

module.exports = upload;

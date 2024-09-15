const imageRouter = require('express').Router();
const upload = require('../middleware/imageMiddleware');  // Import middleware Multer đã tạo

const { uploadImage, deleteImage } = require('../controllers/imageController');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

imageRouter.use(authMiddleware, authorizeRoles('admin')); // Áp dụng authMiddleware cho tất cả các route

// Thay đổi từ .single sang .array để upload nhiều ảnh
imageRouter.post('/upload', upload.single('image'), uploadImage);  // 'images' là tên input, 10 là số lượng tối đa ảnh được phép upload

// Thay thế hình ảnh
// imageRouter.post('/replace', upload.single('image'), replaceImage);

// Xóa hình ảnh
imageRouter.delete('/delete', deleteImage);

module.exports = imageRouter;
const fs = require('fs');
const path = require('path');

const uploadImage = async (req, res) => {
    try {
        // Multer lưu các file trong req.file khi dùng .single()
        if (req.file) {
            res.status(200).json({
                message: 'Tải lên ảnh thành công!',
                file: req.file
            });
        } else {
            res.status(400).json({ message: 'Không có ảnh nào được tải lên' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Xóa hình ảnh
const deleteImage = async (req, res) => {
    try {
        let imageToDelete = req.query.image;  // Tên hình ảnh được gửi qua query parameters

        // Kiểm tra và loại bỏ phần thư mục nếu có
        if (imageToDelete) {
            // Chỉ lấy tên file từ đường dẫn
            const imageName = path.basename(imageToDelete);
            const imagePath = path.join(__dirname, '../assets/images', imageName);

            // Kiểm tra sự tồn tại của file trước khi xóa
            fs.access(imagePath, fs.constants.F_OK, (err) => {
                if (err) {
                    console.error('File không tồn tại:', imagePath);
                    return res.status(200).json({ message: 'Hình ảnh không tồn tại' });
                }

                // Nếu file tồn tại, thực hiện xóa
                fs.unlink(imagePath, (err) => {
                    if (err) {
                        console.error('Error deleting image:', err);
                        return res.status(500).json({ message: 'Error deleting image' });
                    }

                    res.status(200).json({ message: 'Hình ảnh đã được xóa thành công!' });
                });
            });
        } else {
            res.status(400).json({ message: 'Tên hình ảnh không được cung cấp' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { uploadImage, deleteImage };
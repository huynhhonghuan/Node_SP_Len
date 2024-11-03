const Order = require('../models/Order');
const Product = require('../models/product');

class ProductRepository {

    // Product
    async getAllProducts() {
        return await Product.find({});
    }

    async getProductById(id) {
        return await Product.findById(id);
    }
    async getProductByName(name) {
        return await Product.findOne({ name });
    }

    async getProductByLatestUpdateAt() {
        return await Product.find().sort({ updatedAt: -1 }).limit(24);
    }
    async getProductByOrderMany() {
        try {
            // Dùng aggregation để tính tổng số lượng bán của từng sản phẩm
            const order = await Order.find({});

            if (order.length > 0) {

            } else {

            }

            // Nếu số lượng sản phẩm lấy được ít hơn 12, thêm sản phẩm ngẫu nhiên
            if (products.length < 12) {
                const remaining = 12 - products.length;
                const randomProducts = await Product.aggregate([
                    { $sample: { size: remaining } }, // Lấy ngẫu nhiên sản phẩm
                    {
                        $project: {
                            _id: 0,
                            productId: "$_id",
                            totalSold: 0, // Sản phẩm ngẫu nhiên không có số lượng bán
                            name: 1,
                            price: 1,
                            image: 1
                        }
                    }
                ]);
                // Gộp danh sách sản phẩm bán chạy và ngẫu nhiên
                return [...products, ...randomProducts];
            }

            return products;  // Trả về danh sách sản phẩm
        } catch (err) {
            console.error(err);
            throw new Error('Có lỗi xảy ra khi lấy sản phẩm');
        }
    }

    async createProduct(product) {
        return await Product.create(product);
    }

    async updateProduct(id, updatedProduct) {
        return await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete(id);
    }
    async getProductByType(type) {
        return await Product.find({ type: type });
    }

    // Option
    async getAllOptions(id) {
        const product = await Product.findById(id);
        return product ? product.options : null;
    }
    async getProductByOptionId(optionId) {
        return await Product.findOne({ 'options._id': optionId });
    }
    async createOption(productid, options) {
        return await Product.findByIdAndUpdate(
            productid, // Tìm sản phẩm có cùng với id
            { $push: { options: options } }, // Thêm tất cả các options vào thuộc tính options 
            { new: true }
        );
    }

    // Xử lý việc cập nhật bao gồm thêm giá trị mới, sửa giá trị cũ, và xóa giá trị không tồn tại
    async updateMultipleOptions(productid, updatedOptions) {
        const product = await Product.findById(productid);

        if (!product) {
            throw new Error("Product not found");
        }

        const existingOptionIds = product.options.map(option => option._id.toString());
        const updatedOptionIds = updatedOptions.map(option => option._id);

        // Cập nhật và thêm mới các options
        const updates = updatedOptions.map(option => {
            if (existingOptionIds.includes(option._id)) {
                // Cập nhật option
                return Product.updateOne(
                    { _id: productid, 'options._id': option._id },
                    {
                        $set: {
                            'options.$.image': option.image,
                            'options.$.quantity': option.quantity,
                            'options.$.price': option.price
                        }
                    }
                );
            } else {
                // Thêm option mới
                return Product.updateOne(
                    { _id: productid },
                    {
                        $push: { options: option }
                    }
                );
            }
        });

        // Xóa các options không có trong updatedOptions
        const optionsToDelete = existingOptionIds.filter(id => !updatedOptionIds.includes(id));
        if (optionsToDelete.length > 0) {
            updates.push(
                Product.updateOne(
                    { _id: productid },
                    { $pull: { options: { _id: { $in: optionsToDelete } } } }
                )
            );
        }

        // Thực hiện tất cả các cập nhật và trả về sản phẩm đã cập nhật
        await Promise.all(updates);

        return Product.findById(productid);
    }

    async deleteOption(productid, optionIds) {
        return await Product.findByIdAndUpdate(
            productid,
            { $pull: { options: { _id: { $in: optionIds } } } }, // Xóa tất cả các option có _id trong danh sách
            { new: true }
        );
    }

    async getProductByCommentAndUser() {
        try {
            const productsWithComments = await Product.aggregate([
                // Unwind để tạo ra một document cho mỗi comment
                { $unwind: "$comments" },

                // Sắp xếp comment theo thời gian tạo mới nhất
                { $sort: { "comments.createdAt": -1 } },

                // Lookup để lấy thông tin chi tiết của user từ bảng User
                {
                    $lookup: {
                        from: 'users', // Collection User
                        localField: 'comments.userId', // Trường để kết nối (userId)
                        foreignField: '_id', // Trường _id của User
                        as: 'userDetails' // Kết quả sẽ được lưu trong userDetails
                    }
                },

                // Unwind để chuyển userDetails thành một object thay vì array
                { $unwind: "$userDetails" },

                // Chọn các trường cần thiết để trả về
                {
                    $project: {
                        _id: 1,
                        name: 1,
                        description: 1,
                        "comments.content": 1,
                        "comments.createdAt": 1,
                        "userDetails.name": 1,
                        "userDetails.email": 1
                    }
                },

                // Giới hạn kết quả trả về (ví dụ: chỉ trả về 10 kết quả)
                { $limit: 3 }
            ]);

            return productsWithComments; // Trả về danh sách sản phẩm và comment mới nhất cùng thông tin user
        } catch (err) {
            console.error(err);
            throw new Error('Có lỗi xảy ra khi lấy thông tin sản phẩm và comment');
        }
    }
}

module.exports = new ProductRepository();
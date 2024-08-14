const Product = require('../models/product');

class ProductRepository {

    // Product
    async getAllProducts() {
        return await Product.find({});
    }

    async getProductById(id) {
        return await Product.findById(id);
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

}

module.exports = new ProductRepository();
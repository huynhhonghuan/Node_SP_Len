const Discount = require('../models/discount');

class DiscountRepository {
    async getAllDiscounts() {
        return await Discount.find({});
    }

    async getDiscountById(id) {
        return await Discount.findById(id);
    }
    async getDiscountByCode(code) {
        return await Discount.findOne({ code });
    }

    async getDiscountNewUpdated() {
        return await Discount.find({ $or: [{ new: true }, { isActive: true }] })
            .sort({ updatedAt: -1 }) // Sắp xếp theo ngày cập nhật mới nhất
            .limit(1); // Giới hạn trả về 1 bản ghi
    }

    async createDiscount(discount) {
        return await Discount.create(discount);
    }

    async updateDiscount(id, updatedDiscount) {
        return await Discount.findByIdAndUpdate(id, updatedDiscount, { new: true });
    }

    async deleteDiscount(id) {
        return await Discount.findByIdAndDelete(id);
    }
}

module.exports = new DiscountRepository();
const Discount = require('../models/discount');

class DiscountRepository {
    async getAllDiscounts() {
        return await Discount.find({});
    }

    async getDiscountById(id) {
        return await Discount.findById(id);
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
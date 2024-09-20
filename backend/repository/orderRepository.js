const Order = require('../models/Order');

class OrderRepository {
    async getAllOrders() {
        return await Order.find({});
    }

    async getOrderById(id) {
        return await Order.findById(id);
    }

    async getUserOrders(userId) {
        return await Order.find({ userId });
    }

    async createOrder(order) {
        return await Order.create(order);
    }

    async updateOrder(id, updatedOrder) {
        return await Order.findByIdAndUpdate(id, updatedOrder, { new: true });
    }

    async deleteOrder(id) {
        return await Order.findByIdAndDelete(id);
    }
    
}

module.exports = new OrderRepository();
const OrderRepository = require('../repository/orderRepository');

const getAllOrders = async (req, res) => {
    try {
        const orders = await OrderRepository.getAllOrders();
        res.json({ orders: orders, message: 'All orders' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getOrderById = async (req, res) => {
    try {
        const order = await OrderRepository.getOrderById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ order: order, message: 'Order retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getUserOrders = async (req, res) => {
    try {
        const orders = await OrderRepository.getUserOrders(req.params.userId);
        if (!orders) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.json({ orders: orders, message: 'Orders retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOrder = async (req, res) => {
    try {
        const order = await OrderRepository.createOrder(req.body);
        res.status(201).json({ order: order, message: 'Order created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateOrder = async (req, res) => {
    try {
        const updatedOrder = await OrderRepository.updateOrder(req.params.id, req.body);
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ order: updatedOrder, message: 'Order updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOrder = async (req, res) => {
    try {
        const deletedOrder = await OrderRepository.deleteOrder(req.params.id);
        if (!deletedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json({ message: 'Order deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllOrders,
    getOrderById,
    getUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};
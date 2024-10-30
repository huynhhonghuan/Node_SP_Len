const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

class ChartRepository {
    async getStatisticalUser() {
        const users = await User.find();
        const totalUsers = users.length;
        const activeUsers = users.filter(user => user.isActive).length;
        const inactiveUsers = users.filter(user => !user.isActive).length;
        const usersRoleStaff = users.filter(user => user.role === 'staff').length;
        const usersRoleCustomer = users.filter(user => user.role === 'customer').length;
        const usersRoleShipper = users.filter(user => user.role === 'shipper').length;
        return {
            totalUsers,
            activeUsers,
            inactiveUsers,
            usersRoleStaff,
            usersRoleCustomer,
            usersRoleShipper,
        };
    }
    async getStatisticalProduct() {
        const products = await Product.find();
        const totalProducts = products.length;
        const totalProductWool = products.filter(product => product.type === 'wool').length;
        const totalProductProduct = products.filter(product => product.type === 'product').length;
        const totalProductTool = products.filter(product => product.type === 'tool').length;
        return {
            totalProducts,
            totalProductWool,
            totalProductProduct,
            totalProductTool,
        };
    }
    async getStatisticalOrder() {
        const orders = await Order.find();
        const totalOrders = orders.length;

        // Lấy ngày hiện tại
        const today = new Date();

        // Hàm tính chênh lệch ngày
        const daysDifference = (date) => {
            const orderDate = new Date(date);
            const timeDifference = today - orderDate;
            return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        };

        // Lọc số lượng đơn hàng cho từng khoảng thời gian
        const totalOrderToday = orders.filter(order => daysDifference(order.date) === 0).length;
        const totalOrderLast7Days = orders.filter(order => daysDifference(order.date) <= 7).length;
        const totalOrderLast14Days = orders.filter(order => daysDifference(order.date) <= 14).length;
        const totalOrderLast30Days = orders.filter(order => daysDifference(order.date) <= 30).length;

        return {
            totalOrders,
            totalOrderToday,
            totalOrderLast7Days,
            totalOrderLast14Days,
            totalOrderLast30Days,
        };
    }
}

module.exports = new ChartRepository();
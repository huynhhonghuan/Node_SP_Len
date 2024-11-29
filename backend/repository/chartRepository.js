const User = require('../models/user');
const Product = require('../models/product');
const Order = require('../models/order');

class ChartRepository {
    async getStatisticalCount() {
        const totalUsers = (await User.find()).length;
        const totalProducts = (await Product.find()).length;
        const totalOrders = (await Order.find()).length;
        return {
            totalUsers,
            totalProducts,
            totalOrders,
        };
    }

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
    // async getStatisticalOrder(dataDate) {

    //     const orders = await Order.find();
    //     const totalOrders = orders.length;

    //     // Lấy ngày hiện tại
    //     const today = new Date();

    //     // Hàm tính chênh lệch ngày
    //     const daysDifference = (date) => {
    //         const orderDate = new Date(date);
    //         const timeDifference = today - orderDate;
    //         return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    //     };

    //     // Lọc số lượng đơn hàng cho từng khoảng thời gian
    //     const totalOrderToday = orders.filter(order => daysDifference(order.date) === 0).length;
    //     const totalOrderLast7Days = orders.filter(order => daysDifference(order.date) <= 7).length;
    //     const totalOrderLast14Days = orders.filter(order => daysDifference(order.date) <= 14).length;
    //     const totalOrderLast30Days = orders.filter(order => daysDifference(order.date) <= 30).length;

    //     return {
    //         totalOrders,
    //         totalOrderToday,
    //         totalOrderLast7Days,
    //         totalOrderLast14Days,
    //         totalOrderLast30Days,
    //     };
    // }

    async getStatisticalOrder(dataDate) {
        const { startDate, endDate } = dataDate;

        // Chuyển đổi ngày bắt đầu và ngày kết thúc thành dạng `Date`
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Lấy danh sách đơn hàng trong khoảng thời gian
        const orders = await Order.find({
            date: {
                $gte: start,
                $lte: end,
            },
        });

        const totalOrders = orders.length;

        // Tính số ngày giữa `startDate` và `endDate`
        const timeDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));

        // Hàm tính số ngày giữa ngày đơn hàng và `startDate`
        const getDayIndex = (date) => {
            return Math.floor((new Date(date) - start) / (1000 * 60 * 60 * 24));
        };

        if (timeDifference <= 7) {
            // **Trường hợp 1**: Thống kê đơn hàng từng ngày (thời gian <= 7 ngày)
            const ordersByDay = Array.from({ length: timeDifference + 1 }, (_, i) => ({
                [`${start.getDate() + i}/${start.getMonth() + 1}/${start.getFullYear()}`]: orders.filter(order => getDayIndex(order.date) === i).length,
            }));
            return { title: "Thống kê đơn hàng theo ngày", totalOrders, dataStatistical: ordersByDay };

        } else if (timeDifference > 7 && timeDifference <= 30) {
            // **Trường hợp 2**: Thống kê đơn hàng theo các khoảng ngày (1, 7, 14, 21, 30 ngày)
            const ordersByPeriod = [
                { day: 1, orders: 0 },
                { day: 7, orders: 0 },
                { day: 14, orders: 0 },
                { day: 21, orders: 0 },
                { day: 30, orders: 0 },
            ];

            // Duyệt qua các khoảng ngày và đếm số lượng đơn hàng trong từng khoảng
            orders.forEach((order) => {
                const dayIndex = getDayIndex(order.date);

                if (dayIndex <= 1) ordersByPeriod[0].orders++;
                if (dayIndex <= 7) ordersByPeriod[1].orders++;
                if (dayIndex <= 14) ordersByPeriod[2].orders++;
                if (dayIndex <= 21) ordersByPeriod[3].orders++;
                if (dayIndex <= 30) ordersByPeriod[4].orders++;
            });

            // Chuyển đổi dữ liệu để hiển thị theo định dạng ngày tháng
            const ordersByPeriodFormatted = ordersByPeriod.map(period => {
                const periodDate = new Date(start);
                periodDate.setDate(start.getDate() + period.day);
                return {
                    [`${periodDate.getDate()}/${periodDate.getMonth() + 1}/${periodDate.getFullYear()}`]: period.orders,
                };
            });

            return { title: "Thống kê đơn hàng theo ngày", totalOrders, dataStatistical: ordersByPeriodFormatted };

        } else if (timeDifference > 30 && timeDifference <= 365) {
            // **Trường hợp 3**: Thống kê theo từng tháng (từ 1 tháng đến 1 năm)
            const ordersByMonth = [];

            // Lặp qua từng tháng trong khoảng thời gian từ `startDate` đến `endDate`
            let startMonth = start.getMonth();
            let startYear = start.getFullYear();
            let endMonth = end.getMonth();
            let endYear = end.getFullYear();

            // Lặp qua từng tháng và thống kê đơn hàng
            for (let year = startYear; year <= endYear; year++) {
                // Xác định tháng bắt đầu và tháng kết thúc trong năm
                const monthStart = (year === startYear) ? startMonth : 0;
                const monthEnd = (year === endYear) ? endMonth : 11;

                for (let month = monthStart; month <= monthEnd; month++) {
                    // Tìm số lượng đơn hàng trong tháng hiện tại
                    const monthOrders = orders.filter(
                        (order) => new Date(order.date).getMonth() === month && new Date(order.date).getFullYear() === year
                    ).length;

                    // Đảm bảo hiển thị tháng này, kể cả khi không có đơn hàng (số lượng = 0)
                    const monthLabel = `Tháng ${month + 1}/${year}`;
                    ordersByMonth.push({ [monthLabel]: monthOrders });
                }
            }

            return { title: "Thống kê đơn hàng theo tháng", totalOrders, dataStatistical: ordersByMonth };
        } else {
            // **Trường hợp 4**: Thống kê theo từng năm (thời gian > 365 ngày)
            const ordersByYear = [];
            const startYear = start.getFullYear();
            const endYear = end.getFullYear();

            for (let year = startYear; year <= endYear; year++) {
                const yearOrders = orders.filter(
                    (order) => new Date(order.date).getFullYear() === year
                ).length;

                ordersByYear.push({ [year]: yearOrders });
            }

            return { title: "Thống kê đơn hàng theo năm", totalOrders, dataStatistical: ordersByYear };
        }
    }

    async getRevenueOrder(dataDate) {
        const { startDate, endDate } = dataDate;

        // Chuyển đổi ngày bắt đầu và ngày kết thúc thành dạng `Date`
        const start = new Date(startDate);
        const end = new Date(endDate);

        // Lấy danh sách đơn hàng trong khoảng thời gian
        const orders = await Order.find({
            date: {
                $gte: start,
                $lte: end,
            },
        });

        const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);

        // Tính số ngày giữa `startDate` và `endDate`
        const timeDifference = Math.floor((end - start) / (1000 * 60 * 60 * 24));

        // Hàm tính số ngày giữa ngày đơn hàng và `startDate`
        const getDayIndex = (date) => {
            return Math.floor((new Date(date) - start) / (1000 * 60 * 60 * 24));
        };

        if (timeDifference <= 7) {
            // **Trường hợp 1**: Thống kê doanh thu từng ngày (thời gian <= 7 ngày)
            const revenueByDay = Array.from({ length: timeDifference + 1 }, (_, i) => {
                const dailyRevenue = orders
                    .filter(order => getDayIndex(order.date) === i)
                    .reduce((sum, order) => sum + order.totalPrice, 0);

                return {
                    [`${start.getDate() + i}/${start.getMonth() + 1}/${start.getFullYear()}`]: dailyRevenue,
                };
            });

            return { title: "Thống kê doanh thu theo ngày", totalRevenue, dataStatistical: revenueByDay };

        } else if (timeDifference > 7 && timeDifference <= 30) {
            // **Trường hợp 2**: Thống kê doanh thu theo các khoảng ngày (1, 7, 14, 21, 30 ngày)
            const revenueByPeriod = [
                { day: 1, revenue: 0 },
                { day: 7, revenue: 0 },
                { day: 14, revenue: 0 },
                { day: 21, revenue: 0 },
                { day: 30, revenue: 0 },
            ];

            orders.forEach((order) => {
                const dayIndex = getDayIndex(order.date);

                if (dayIndex <= 1) revenueByPeriod[0].revenue += order.totalPrice;
                if (dayIndex <= 7) revenueByPeriod[1].revenue += order.totalPrice;
                if (dayIndex <= 14) revenueByPeriod[2].revenue += order.totalPrice;
                if (dayIndex <= 21) revenueByPeriod[3].revenue += order.totalPrice;
                if (dayIndex <= 30) revenueByPeriod[4].revenue += order.totalPrice;
            });

            const revenueByPeriodFormatted = revenueByPeriod.map(period => {
                const periodDate = new Date(start);
                periodDate.setDate(start.getDate() + period.day);
                return {
                    [`${periodDate.getDate()}/${periodDate.getMonth() + 1}/${periodDate.getFullYear()}`]: period.revenue,
                };
            });

            return { title: "Thống kê doanh thu theo ngày", totalRevenue, dataStatistical: revenueByPeriodFormatted };

        } else if (timeDifference > 30 && timeDifference <= 365) {
            // **Trường hợp 3**: Thống kê doanh thu theo từng tháng
            const revenueByMonth = [];

            let startMonth = start.getMonth();
            let startYear = start.getFullYear();
            let endMonth = end.getMonth();
            let endYear = end.getFullYear();

            for (let year = startYear; year <= endYear; year++) {
                const monthStart = (year === startYear) ? startMonth : 0;
                const monthEnd = (year === endYear) ? endMonth : 11;

                for (let month = monthStart; month <= monthEnd; month++) {
                    const monthRevenue = orders
                        .filter(order => new Date(order.date).getMonth() === month && new Date(order.date).getFullYear() === year)
                        .reduce((sum, order) => sum + order.totalPrice, 0);

                    const monthLabel = `Tháng ${month + 1}/${year}`;
                    revenueByMonth.push({ [monthLabel]: monthRevenue });
                }
            }

            return { title: "Thống kê doanh thu theo tháng", totalRevenue, dataStatistical: revenueByMonth };

        } else {
            // **Trường hợp 4**: Thống kê doanh thu theo từng năm
            const revenueByYear = [];
            const startYear = start.getFullYear();
            const endYear = end.getFullYear();

            for (let year = startYear; year <= endYear; year++) {
                const yearRevenue = orders
                    .filter(order => new Date(order.date).getFullYear() === year)
                    .reduce((sum, order) => sum + order.totalPrice, 0);

                revenueByYear.push({ [year]: yearRevenue });
            }

            return { title: "Thống kê doanh thu theo năm", totalRevenue, dataStatistical: revenueByYear };
        }
    }

}


module.exports = new ChartRepository();
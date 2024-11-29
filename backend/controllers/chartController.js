const ChartRepository = require('../repository/chartRepository');

const getStatisticalCount = async (req, res) => {
    try {
        const countStats = await ChartRepository.getStatisticalCount();
        res.json({
            data: countStats,
            status: 200,
            message: 'Statistical count data'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStatisticalUser = async (req, res) => {
    try {
        const userStats = await ChartRepository.getStatisticalUser();
        res.json({
            data: userStats,
            status: 200,
            message: 'Statistical user data'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStatisticalProduct = async (req, res) => {
    try {
        const productStats = await ChartRepository.getStatisticalProduct();
        res.json({
            data: productStats,
            status: 200,
            message: 'Statistical product data'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStatisticalOrder = async (req, res) => {
    try {
        const orderStats = await ChartRepository.getStatisticalOrder(req.query);
        res.json({
            data: orderStats,
            status: 200,
            message: 'Statistical order data'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStatisticalRevenueOrder = async (req, res) => {
    try {
        const orderStats = await ChartRepository.getRevenueOrder(req.query);
        res.json({
            data: orderStats,
            status: 200,
            message: 'Statistical order data'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getStatisticalCount,
    getStatisticalUser,
    getStatisticalProduct,
    getStatisticalOrder,
    getStatisticalRevenueOrder,
}
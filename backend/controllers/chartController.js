const ChartRepository = require('../repository/chartRepository');

const getStatisticalUser = async (req, res) => {
    try {
        const userStats = await ChartRepository.getStatisticalUser();
        res.json({
            statistical: userStats,
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
            statistical: productStats,
            status: 200,
            message: 'Statistical product data'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getStatisticalOrder = async (req, res) => {
    try {
        const orderStats = await ChartRepository.getStatisticalOrder();
        res.json({
            statistical: orderStats,
            status: 200,
            message: 'Statistical order data'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getStatisticalUser,
    getStatisticalProduct,
    getStatisticalOrder,
}
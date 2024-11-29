const chartRouter = require('express').Router();
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Import controllers

const {
    getStatisticalCount,
    getStatisticalUser,
    getStatisticalProduct,
    getStatisticalOrder,
    getStatisticalRevenueOrder,
} = require('../controllers/chartController');

// Routes

chartRouter.get('/count', authMiddleware, authorizeRoles('admin'), getStatisticalCount);
chartRouter.get('/user', authMiddleware, authorizeRoles('admin'), getStatisticalUser);
chartRouter.get('/product', authMiddleware, authorizeRoles('admin'), getStatisticalProduct);
chartRouter.get('/order', authMiddleware, authorizeRoles('admin'), getStatisticalOrder);
chartRouter.get('/revenue-order', authMiddleware, authorizeRoles('admin'), getStatisticalRevenueOrder);

module.exports = chartRouter;
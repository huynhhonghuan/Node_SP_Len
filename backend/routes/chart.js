const chartRouter = require('express').Router();
const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Import controllers

const {
    getStatisticalUser,
    getStatisticalProduct,
    getStatisticalOrder
} = require('../controllers/chartController');

// Routes

chartRouter.get('/user', authMiddleware, authorizeRoles('admin'), getStatisticalUser);
chartRouter.get('/product', authMiddleware, authorizeRoles('admin'), getStatisticalProduct);
chartRouter.get('/order', authMiddleware, authorizeRoles('admin'), getStatisticalOrder);

module.exports = chartRouter;
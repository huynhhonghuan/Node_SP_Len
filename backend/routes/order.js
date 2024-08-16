const orderRouter = require('express').Router();

const { validateObjectId } = require('../validators/orderValidator');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

const {
    getAllOrders,
    getOrderById,
    getUserOrders,
    createOrder,
    updateOrder,
    deleteOrder,
} = require('../controllers/oderController');

// Middleware to use order router only when authenticated and authorized to access it

orderRouter.use(authMiddleware, authorizeRoles('admin', 'user'));

// Routes order

orderRouter.route('/').get(getAllOrders);

orderRouter.route('/:id').get(validateObjectId, getOrderById);

orderRouter.route('/user/:userId').get(getUserOrders);

orderRouter.route('/').post(createOrder);

orderRouter.route('/:id').put(validateObjectId, updateOrder);

orderRouter.route('/:id').delete(validateObjectId, deleteOrder);

module.exports = orderRouter;
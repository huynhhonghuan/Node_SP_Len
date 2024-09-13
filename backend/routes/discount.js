const discountRouter = require('express').Router();

const { validateObjectId, validateDiscountData } = require('../validators/discountValidator');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

const {
    getAllDiscounts,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount,
} = require('../controllers/discountController');

// Middleware to use discount router only when authenticated and authorized to access it

discountRouter.use(authMiddleware, authorizeRoles('admin'));

// Routes discount

discountRouter.route('/').get(getAllDiscounts);

discountRouter.route('/:id').get(validateObjectId, getDiscountById);

discountRouter.route('/').post(validateDiscountData(false), createDiscount);

discountRouter.route('/:id').put(validateObjectId, validateDiscountData(true), updateDiscount);

discountRouter.route('/:id').delete(validateObjectId, deleteDiscount);

module.exports = discountRouter;
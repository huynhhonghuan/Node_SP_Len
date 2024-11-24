const productRouter = require('express').Router();

const { validateObjectId, validateProductData, validateOptionData, validateComment, } = require('../validators/productValidator');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Import controllers

const {
    getAllProducts,
    getProductById,
    getProductByLatestUpdateAt,
    getProductByOrderMany,
    getOrderByCommentAndUser,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByType,
    getProductByOptionId,
    createOption,
    updateOption,
    deleteOption,
    createComment,
    updateComment,
} = require('../controllers/productController');

productRouter.route('/all').get(getAllProducts);

productRouter.route('/type/:type').get(getProductByType);

productRouter.route('/new').get(getProductByLatestUpdateAt);

productRouter.route('/bestseller').get(getProductByOrderMany);

productRouter.route('/commentanduser').get(getOrderByCommentAndUser);

productRouter.route('/:id').get(validateObjectId, getProductById);

// Middleware to use product router only when authenticated and authorized to access it

productRouter.use(authMiddleware, authorizeRoles('admin', 'customer'));

// Routes product

productRouter.route('/').get(getAllProducts);

productRouter.route('/').post(validateProductData, createProduct);

productRouter.route('/:id').put(validateObjectId, validateProductData, updateProduct);

productRouter.route('/:id').delete(validateObjectId, deleteProduct);

// Routes Options

// productRouter.route('/options/:id').get(validateObjectId, getAllOptions);

productRouter.route('/options/:optionid').get(validateObjectId, getProductByOptionId);

productRouter.route('/options/:productid').post(validateOptionData, createOption);

productRouter.route('/options/:productid').put(validateObjectId, validateOptionData, updateOption);

productRouter.route('/options/:productid').delete(validateObjectId, deleteOption);

// Route Comment
productRouter.route('/comment/:productid').post(validateObjectId, validateComment, createComment);

productRouter.route('/comment/:productid').put(validateObjectId, validateComment, updateComment)

module.exports = productRouter;
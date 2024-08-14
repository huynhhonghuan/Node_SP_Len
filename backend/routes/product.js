const productRouter = require('express').Router();

const { validateObjectId, validateProductData, validateOptionData, } = require('../validators/productValidator');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

// Import controllers

const {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByType,
    // getAllOptions,
    getProductByOptionId,
    createOption,
    updateOption,
    deleteOption,
} = require('../controllers/productController');

// Middleware to use product router only when authenticated and authorized to access it

productRouter.use(authMiddleware, authorizeRoles('admin'));

// Routes product

productRouter.route('/').get(getAllProducts);

productRouter.route('/:id').get(validateObjectId, getProductById);

productRouter.route('/').post(validateProductData, createProduct);

productRouter.route('/:id').put(validateObjectId, validateProductData, updateProduct);

productRouter.route('/:id').delete(validateObjectId, deleteProduct);

productRouter.route('/type/:type').get(getProductByType);

// Routes Options

// productRouter.route('/options/:id').get(validateObjectId, getAllOptions);

productRouter.route('/options/:optionid').get(validateObjectId, getProductByOptionId);

productRouter.route('/options/:productid').post(validateOptionData, createOption);

productRouter.route('/options/:productid').put(validateObjectId, validateOptionData, updateOption);

productRouter.route('/options/:productid').delete(validateObjectId, deleteOption);

module.exports = productRouter;
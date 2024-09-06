const ComboProductRoute = require('express').Router();

const { validateObjectId, validateComboProductData } = require('../validators/comboProductValidator');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

const {
    getAllComboProducts,
    getComboProductById,
    createComboProduct,
    updateComboProduct,
    deleteComboProduct,
} = require('../controllers/comboProductController');

ComboProductRoute.get('/', getAllComboProducts);

ComboProductRoute.get('/:id', validateObjectId, getComboProductById);

ComboProductRoute.post('/', authMiddleware, authorizeRoles('admin'), validateComboProductData, createComboProduct);

ComboProductRoute.put('/:id', authMiddleware, authorizeRoles('admin'), validateObjectId, validateComboProductData, updateComboProduct);

ComboProductRoute.delete('/:id', authMiddleware, authorizeRoles('admin'), validateObjectId, deleteComboProduct);

module.exports = ComboProductRoute;
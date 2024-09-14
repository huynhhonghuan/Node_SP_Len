const ComboProductRepository = require('../../backend/repository/comboProductRepository');

const getAllComboProducts = async (req, res) => {
    try {
        const comboProducts = await ComboProductRepository.getAllComboProducts();
        res.json({ data: comboProducts, message: 'All combo products' });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

const getComboProductById = async (req, res) => {
    try {
        const comboProduct = await ComboProductRepository.getComboProductById(req.params.id);
        if (!comboProduct) {
            return res.status(404).json({ message: 'Combo product not found' });
        }
        res.json({ data: comboProduct, message: 'Combo product retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createComboProduct = async (req, res) => {
    try {
        const comboProduct = await ComboProductRepository.createComboProduct(req.body);
        res.status(201).json({ data: comboProduct, message: 'Combo product created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateComboProduct = async (req, res) => {
    try {
        const updatedComboProduct = await ComboProductRepository.updateComboProduct(req.params.id, req.body);
        if (!updatedComboProduct) {
            return res.status(404).json({ message: 'Combo product not found' });
        }
        res.json({ data: updatedComboProduct, message: 'Combo product updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteComboProduct = async (req, res) => {
    try {
        const deletedComboProduct = await ComboProductRepository.deleteComboProduct(req.params.id);
        if (!deletedComboProduct) {
            return res.status(404).json({ message: 'Combo product not found' });
        }
        res.json({ message: 'Combo product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllComboProducts,
    getComboProductById,
    createComboProduct,
    updateComboProduct,
    deleteComboProduct,
}
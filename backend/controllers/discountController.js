const DiscountRepository = require('../repository/discountRepository');

const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await DiscountRepository.getAllDiscounts();
        res.json({ discounts: discounts, message: 'All discounts' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDiscountById = async (req, res) => {
    try {
        const discount = await DiscountRepository.getDiscountById(req.params.id);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.json({ discount: discount, message: 'Discount retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createDiscount = async (req, res) => {
    try {
        const discount = await DiscountRepository.createDiscount(req.body);
        res.status(201).json({ discount: discount, message: 'Discount created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateDiscount = async (req, res) => {
    try {
        const updatedDiscount = await DiscountRepository.updateDiscount(req.params.id, req.body);
        if (!updatedDiscount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.json({ discount: updatedDiscount, message: 'Discount updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteDiscount = async (req, res) => {
    try {
        const deletedDiscount = await DiscountRepository.deleteDiscount(req.params.id);
        if (!deletedDiscount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.json({ message: 'Discount deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllDiscounts,
    getDiscountById,
    createDiscount,
    updateDiscount,
    deleteDiscount,
};
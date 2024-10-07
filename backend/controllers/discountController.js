const DiscountRepository = require('../repository/discountRepository');

const getAllDiscounts = async (req, res) => {
    try {
        const discounts = await DiscountRepository.getAllDiscounts();
        res.json({ data: discounts, message: 'All discounts' });
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
        res.json({ data: discount, message: 'Discount retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getDiscountByCode = async (req, res) => {
    try {
        const discount = await DiscountRepository.getDiscountByCode(req.params.code);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.json({ data: discount, message: 'Discount retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// lấy 1 mã giảm với ngày update gần nhất
const getDiscountNewUpdated = async (req, res) => {
    try {
        const discount = await DiscountRepository.getDiscountNewUpdated(req.params.id);
        if (!discount) {
            return res.status(404).json({ message: 'Discount not found' });
        }
        res.json({ data: discount, message: 'Discount retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createDiscount = async (req, res) => {
    try {
        const discount = await DiscountRepository.createDiscount(req.body);
        res.json({ data: discount, message: 'Discount created' });
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
        res.json({ data: updatedDiscount, message: 'Discount updated' });
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
    getDiscountByCode,
    getDiscountNewUpdated,
    createDiscount,
    updateDiscount,
    deleteDiscount,
};
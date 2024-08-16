const validatorJS = require('validator');

const { check, validationResult } = require('express-validator');

// Example usage
const validateObjectId = async (req, res, next) => {
    const id = req.params.id || req.params.userid || req.params.productid || '';
    if (!validatorJS.isMongoId(id)) {
        return res.status(400).json({ message: 'Invalid ID' });
    }
    next();
}

module.exports = {
    validateObjectId,
};

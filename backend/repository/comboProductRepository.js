const ComboProduct = require("../../backend/models/combo_product");

class ComboProductRepository {
    getAllComboProducts() {
        return ComboProduct.find({});
    }
    getComboProductById(id) {
        return ComboProduct.findById(id);
    }
    createComboProduct(comboProduct) {
        return ComboProduct.create(comboProduct);
    }
    updateComboProduct(id, updatedComboProduct) {
        return ComboProduct.findByIdAndUpdate(id, updatedComboProduct, { new: true });
    }
    deleteComboProduct(id) {
        return ComboProduct.findByIdAndDelete(id);
    }
}

module.exports = new ComboProductRepository();
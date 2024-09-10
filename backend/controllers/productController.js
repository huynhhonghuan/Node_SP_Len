const ProductRepository = require('../repository/productRepository');

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductRepository.getAllProducts();
        res.json({ product: products, message: 'All products' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductById = async (req, res) => {
    try {
        const product = await ProductRepository.getProductById(req.params.id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ product: product, message: 'Product retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const product = await ProductRepository.createProduct(req.body);
        res.status(201).json({ product: product, message: 'Product created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await ProductRepository.updateProduct(req.params.id, req.body);
        if (!updatedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ product: updatedProduct, message: 'Product updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await ProductRepository.deleteProduct(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ message: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByType = async (req, res) => {
    try {
        const productsByType = await ProductRepository.getProductByType(req.params.type);
        res.json({ products: productsByType, message: 'Products of type: ' + req.params.type });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getAllOptions = async (req, res) => {
    try {
        const options = await ProductRepository.getAllOptions(req.params.id);
        res.json({ options: options, message: `All options by id Product: ${id}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByOptionId = async (req, res) => {
    try {
        const productByOption = await ProductRepository.getProductByOptionId(req.params.optionid);
        res.json({ product: productByOption, message: 'Product by option: ' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOption = async (req, res) => {
    try {
        const option = await ProductRepository.createOption(req.params.productid, req.body);
        res.json({ product: option, message: 'Option created by productId: ' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateOption = async (req, res) => {
    try {
        const updatedOption = await ProductRepository.updateMultipleOptions(req.params.productid, req.body.options);
        res.json({ product: updatedOption, message: 'Option updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOption = async (req, res) => {
    try {
        const deletedOption = await ProductRepository.deleteOption(req.params.productid, req.body);
        res.json({ product: deletedOption, message: 'Option deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByType,
    getAllOptions,
    getProductByOptionId,
    createOption,
    updateOption,
    deleteOption,
};
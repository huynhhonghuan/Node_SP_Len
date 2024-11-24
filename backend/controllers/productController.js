const ProductRepository = require('../repository/productRepository');

const getAllProducts = async (req, res) => {
    try {
        const products = await ProductRepository.getAllProducts();
        res.json({ data: products, message: 'All products' });
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
        res.json({ data: product, message: 'Product retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        // Nếu có file ảnh, lưu đường dẫn vào cơ sở dữ liệu
        if (req.file) {
            newProduct.image = req.file.path;  // Đường dẫn ảnh sau khi upload
        }
        const product = await ProductRepository.createProduct(newProduct);
        res.status(201).json({ data: product, message: 'Product created' });
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
        res.json({ data: updatedProduct, message: 'Product updated' });
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

const getAllOptions = async (req, res) => {
    try {
        const options = await ProductRepository.getAllOptions(req.params.id);
        res.json({ data: options, message: `All options by id Product: ${id}` });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByOptionId = async (req, res) => {
    try {
        const productByOption = await ProductRepository.getProductByOptionId(req.params.optionid);
        res.json({ data: productByOption, message: 'Product by option: ' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createOption = async (req, res) => {
    try {
        const option = await ProductRepository.createOption(req.params.productid, req.body);
        res.json({ data: option, message: 'Option created by productId: ' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateOption = async (req, res) => {
    try {
        const updatedOption = await ProductRepository.updateMultipleOptions(req.params.productid, req.body.options);
        res.json({ data: updatedOption, message: 'Option updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteOption = async (req, res) => {
    try {
        const deletedOption = await ProductRepository.deleteOption(req.params.productid, req.body);
        res.json({ data: deletedOption, message: 'Option deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Cho trang chủ
const getProductByType = async (req, res) => {
    try {
        const productsByType = await ProductRepository.getProductByType(req.params.type);
        res.json({ data: productsByType, length: productsByType.length, message: 'Products of type: ' + req.params.type });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByLatestUpdateAt = async (req, res) => {
    try {
        const product = await ProductRepository.getProductByLatestUpdateAt();
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.json({ data: product, message: 'Product retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getProductByOrderMany = async (req, res) => {
    try {
        const products = await ProductRepository.getProductByOrderMany();
        res.json({ data: products, message: 'Products ordered by order: ' + req.params.orderId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getOrderByCommentAndUser = async (req, res) => {
    try {
        const orders = await ProductRepository.getProductByCommentAndUser();
        res.json({ data: orders, message: 'Orders by comment and user: ' + req.params.comment + req.params.userId });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createComment = async (req, res) => {
    try {
        const comment = await ProductRepository.createComment(req.params.productid, req.body);
        res.json({ data: comment, message: 'Comment created' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const updateComment = async (req, res) => {
    try {
        const updatedComment = await ProductRepository.updateComment(req.params.productid, req.body);
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.json({ data: updatedComment, message: 'Comment updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    getAllProducts,
    getProductById,
    getProductByLatestUpdateAt,
    getProductByOrderMany,
    getOrderByCommentAndUser,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductByType,
    getAllOptions,
    getProductByOptionId,
    createOption,
    updateOption,
    deleteOption,
    createComment,
    updateComment,
};
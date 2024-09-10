const faker = require('faker');
const ComboProduct = require('../models/combo_product');
const Product = require('../models/product');

// Xóa tất cả combo sản phẩm cũ
const deleteAllComboProduct = async () => {
    await ComboProduct.deleteMany({});
    console.log('Tất cả combo sản phẩm đã xóa!');
}

// Thêm 10 combo sản phẩm mới
const createFakeComboProducts = async (numComboProducts) => {
    const comboProducts = [];

    // Fetch all products and their options
    const products = await Product.find({});

    for (let i = 0; i < numComboProducts; i++) {
        const selectedProducts = [];

        // Randomly select a number of products for each combo
        for (let j = 0; j < faker.datatype.number({ min: 1, max: 5 }); j++) {
            const randomProduct = faker.random.arrayElement(products);

            // Ensure the product has options to choose from
            if (randomProduct.options && randomProduct.options.length > 0) {
                const randomOption = faker.random.arrayElement(randomProduct.options);

                // Push the productId and optionId into the array
                selectedProducts.push({
                    productId: randomProduct._id,
                    optionId: randomOption._id
                });
            }
        }

        // Create a fake combo product
        comboProducts.push({
            name: faker.commerce.productName(),
            price: faker.datatype.number({ min: 1000, max: 10000 }),
            description: faker.lorem.paragraph(),
            products: selectedProducts, // Include products with both productId and optionId
        });
    }

    await ComboProduct.insertMany(comboProducts);
    console.log(`${numComboProducts} Combo sản phẩm đã được thêm!`);
}

module.exports = ComboProductSeeder = async (count) => {
    await deleteAllComboProduct();
    await createFakeComboProducts(count);
}

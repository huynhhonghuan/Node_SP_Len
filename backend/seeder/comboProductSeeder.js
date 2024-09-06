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

    const products = await Product.find({});
    const productIds = products.map(p => p._id);

    for (let i = 0; i < numComboProducts; i++) {
        const product_id = [];

        for (let j = 0; j < faker.datatype.number({ min: 1, max: 5 }); j++) {
            product_id.push(faker.random.arrayElement(productIds));
        }

        comboProducts.push({
            name: faker.commerce.productName(),
            price: faker.datatype.number({ min: 1000, max: 10000 }),
            description: faker.lorem.paragraph(),
            products: product_id,
        });
    }

    await ComboProduct.insertMany(comboProducts);
    console.log(`${numComboProducts} combo sản phẩm đã được thêm!`);
}

module.exports = ComboProductSeeder = async (count) => {
    await deleteAllComboProduct();
    await createFakeComboProducts(count);
}
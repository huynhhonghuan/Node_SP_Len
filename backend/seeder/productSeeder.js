const faker = require('faker');
const Product = require('../models/product');
const mongoose = require('mongoose');
const connectDB = require('../config/database');

// Kết nối đến MongoDB
// connectDB();

// Xóa tất cả sản phẩm cũ
const deleteAllProduct = async () => {
    await Product.deleteMany({});
    console.log('Tất cả sản phẩm đã xóa!');
}

// Thêm 10 sản phẩm m��u

const createFakerProduct = async (number) => {

    for (let i = 0; i < number; i++) {
        const options = [];

        // Tạo tùy chọn faker.datatype.number({ min: 1, max: 5 }) cho mỗi sản phẩm
        lengt = faker.datatype.number({ min: 1, max: 5 })
        for (let j = 0; j < lengt; j++) {
            options.push({
                image: faker.image.imageUrl(),
                // size: faker.random.arrayElement(['small', 'medium', 'large', 'freesize']),
                quantity: faker.datatype.number({ min: 1, max: 100 }),
                price: faker.commerce.price(),
            });
        }

        const product = new Product({
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            // price: faker.commerce.price(),
            image: faker.image.imageUrl(),
            type: faker.random.arrayElement(['wool', 'product']),
            options: options,
            note: faker.lorem.paragraph()
        });

        await Product.create(product);
    }

    console.log(`${number} sản phẩm đã được thêm!`);

}

module.exports = ProductSeeder = async (count) => {
    await deleteAllProduct();
    await createFakerProduct(count);
}
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

// Danh sách các URL hình ảnh thật
const imageUrls = [
    'https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4202325/pexels-photo-4202325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/380954/pexels-photo-380954.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/3612182/pexels-photo-3612182.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4158/apple-iphone-smartphone-desk.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/2928381/pexels-photo-2928381.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/6634270/pexels-photo-6634270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/28096615/pexels-photo-28096615/free-photo-of-el-taller-de-tapetes.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://images.pexels.com/photos/4219606/pexels-photo-4219606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
    // Thêm các URL hình ảnh khác
];

// Hàm lấy URL hình ảnh ngẫu nhiên
const getRandomImageUrl = () => {
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

// Thêm sản phẩm mẫu
const createFakerProduct = async (number) => {
    for (let i = 0; i < number; i++) {
        const options = [];

        // Tạo tùy chọn hình ảnh cho mỗi sản phẩm
        const length = faker.datatype.number({ min: 1, max: 5 });
        for (let j = 0; j < length; j++) {
            options.push({
                image: getRandomImageUrl(), // Sử dụng URL hình ảnh thật
                quantity: faker.datatype.number({ min: 1, max: 100 }),
                price: faker.commerce.price(),
            });
        }

        const product = new Product({
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            image: getRandomImageUrl(), // Sử dụng URL hình ảnh thật
            type: faker.random.arrayElement(['wool', 'product', 'tool']),
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

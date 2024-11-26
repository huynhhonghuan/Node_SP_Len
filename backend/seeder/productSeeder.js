const mongoose = require('mongoose');
const faker = require('faker');
const Product = require('../models/product');
const User = require('../models/user');
const connectDB = require('../config/database');

// Connect to MongoDB if not connected
// connectDB();

// Xóa tất cả sản phẩm cũ
const deleteAllProduct = async () => {
    await Product.deleteMany({});
    console.log('Tất cả sản phẩm đã xóa!');
};

// Danh sách các URL hình ảnh thật
const imageUrls = [

    // Thêm các URL hình ảnh khác
    'assets/images/1.jpg',
    'assets/images/2.jpg',
    'assets/images/3.jpg',
    'assets/images/4.jpg',
    'assets/images/5.jpg',
    'assets/images/6.jpg',
    'assets/images/7.jpg',
];

// Hàm lấy URL hình ảnh ngẫu nhiên
const getRandomImageUrl = () => {
    return imageUrls[Math.floor(Math.random() * imageUrls.length)];
};

// Lấy danh sách ngẫu nhiên 1-2 userId từ User collection
const getRandomUsers = async () => {
    const users = await User.find({}, '_id'); // Chỉ lấy _id của users
    return users.map(user => user._id); // Trả về danh sách userId
};

// Thêm sản phẩm mẫu với comment ngẫu nhiên
const createFakerProduct = async (number) => {
    const userIds = await getRandomUsers(); // Lấy danh sách tất cả userId
    for (let i = 0; i < number; i++) {
        const options = [];
        const length = faker.datatype.number({ min: 1, max: 5 });

        for (let j = 0; j < length; j++) {
            options.push({
                image: getRandomImageUrl(), // Sử dụng URL hình ảnh thật
                quantity: faker.datatype.number({ min: 1, max: 100 }),
                price: faker.commerce.price(),
            });
        }

        // Tạo comment ngẫu nhiên với userId
        const comments = [];
        const numComments = faker.datatype.number({ min: 1, max: 2 });
        for (let k = 0; k < numComments; k++) {
            const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
            comments.push({
                userId: randomUserId,
                content: faker.lorem.sentence(),
                createdAt: faker.date.recent()
            });
        }

        const product = new Product({
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            image: getRandomImageUrl(), // Sử dụng URL hình ảnh thật
            type: faker.random.arrayElement(['wool', 'product', 'tool']),
            options: options,
            note: faker.lorem.paragraph(),
            comments: comments // Thêm comment vào sản phẩm
        });

        await Product.create(product);
    }

    console.log(`${number} sản phẩm đã được thêm với comment!`);
};

module.exports = ProductSeeder = async (count) => {
    // await deleteAllProduct();
    await createFakerProduct(count);
};

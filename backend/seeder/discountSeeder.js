const faker = require('faker');
const Discount = require('../models/discount');
const connectDB = require('../config/database');
const mongoose = require('mongoose');

// Kết nối đến MongoDB

// connectDB();

// Hàm tạo số ngẫu nhiên trong khoảng từ min đến max, chia hết cho step
function getRandomNumberDivisibleByStep(min, max, step) {
    let randomNumber;

    do {
        // Tạo số ngẫu nhiên trong khoảng từ min đến max
        randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    } while (randomNumber % step !== 0); // Kiểm tra xem số đó có chia hết cho step không

    return randomNumber;
}

// Hàm tạo chuỗi ký tự ngẫu nhiên
function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = faker.datatype.number({ min: 0, max: characters.length - 1 });
        result += characters[randomIndex];
    }
    return result;
}

// Xóa tất cả khuyến mãi cũ

const deleteAllDiscount = async () => {
    await Discount.deleteMany({});
    console.log('Tất cả khuyến mãi đã xóa!');
}

// Thêm 10 khuyến mãi mới

const createFakeDiscounts = async (numDiscounts) => {
    const discounts = [];

    for (let i = 0; i < numDiscounts; i++) {
        discounts.push({
            code: generateRandomString(faker.datatype.number({ min: 5, max: 10 })),
            percentage: getRandomNumberDivisibleByStep(5, 100, 5),
            startDate: faker.date.future(1, new Date()),
            endDate: faker.date.future(2, new Date()),
            lowestTotal: getRandomNumberDivisibleByStep(50000, 200000, 5000),
            counts: faker.datatype.number({ min: 1, max: 100 }),
            isActive: Math.random() > 0.5 // Random true or false
        });
    }

    await Discount.insertMany(discounts);
    console.log(`Đã tạo ${numDiscounts} khuyến mãi mới.`);
}

// Gọi hàm xóa và tạo khuyến mãi mới
module.exports = DiscountSeeder = async (count) => {
    await deleteAllDiscount();
    await createFakeDiscounts(count);
}
const faker = require('faker');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/database');
const fs = require('fs');
const path = require('path');

// Kết nối đến MongoDB

// connectDB();

// Đọc dữ liệu tỉnh thành

const filePath = path.join(__dirname, '..', 'assets', 'datas', 'vn_only_simplified_json_generated_data_vn_units.json');

// Kiểm tra xem tập tin có tồn tại không
if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
}

// Đọc dữ liệu từ tập tin JSON
const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));


// Hàm để chọn ngẫu nhiên một phần tử trong mảng
function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

// Hàm tạo đoạn văn ngẫu nhiên với đới dài maxLength: 200
function generateParagraph(maxLength) {
    // Tạo đoạn văn
    let paragraph = faker.lorem.paragraph();

    // Cắt đoạn văn để đảm bảo không vượt quá maxLength
    if (paragraph.length > maxLength) {
        paragraph = paragraph.slice(0, maxLength);
    }

    return paragraph;
}

// Hash mật khẩu
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Xóa dữ liệu cũ
const deleteAll = async () => {
    await User.deleteMany({});
    console.log('Tất cả người dùng đã được xóa!');
}

// Tạo dữ liệu giả và chèn vào cơ sở dữ liệu
const createFakeUsers = async (numUsers) => {
    const users = [];
    // Add a admin
    users.push({
        name: 'Admin',
        email: 'admin@example.com',
        phone: faker.phone.phoneNumberFormat(),
        password: await hashPassword('12345678'),//faker.internet.password()
        role: 'admin'
    });

    for (let i = 0; i < numUsers; i++) {
        const province = getRandomElement(data);
        const district = getRandomElement(province.District);
        const ward = getRandomElement(district.Ward);

        users.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            phone: faker.phone.phoneNumberFormat(),
            password: await hashPassword('12345678'),//faker.internet.password()
            role: faker.random.arrayElement(['customer', 'staff']),
            isActive: Math.random() > 0.5, // Random true or false
            addresses: [{
                phone: faker.phone.phoneNumberFormat(),
                street: faker.address.streetName(),
                city: province.Code,
                district: district.Code,
                ward: ward.Code,
                type: faker.random.arrayElement(['home', 'office', 'other']),
                note: generateParagraph(200),
                default: Math.random() > 0.5, // Random true or false
            }]
        });
    }

    await User.insertMany(users);
    console.log(`${numUsers} fake users created!`);
};

module.exports = UserSeeder = async (count) => {
    await deleteAll();
    await createFakeUsers(count);
}

// deleteAll().then(() => createFakeUsers(10)).then(() => mongoose.connection.close());
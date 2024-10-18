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

// Hàm tạo số điện thoại di đ��ng Việt Nam
function generateVietnamesePhoneNumber() {
    const prefix = '09'; // Đầu số điện thoại di động thường dùng tại Việt Nam
    const number = Math.floor(10000000 + Math.random() * 90000000); // Tạo số từ 10000000 đến 99999999
    return prefix + number.toString();
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

    // Thêm admin vào danh sách users
    users.push({
        name: 'Admin',
        email: 'admin@example.com',
        phone: generateVietnamesePhoneNumber(),
        password: await hashPassword('12345678'),
        role: 'admin'
    });

    for (let i = 0; i < numUsers; i++) {
        const province = getRandomElement(data);
        const district = getRandomElement(province.District);
        const ward = getRandomElement(district.Ward);

        // Tạo số lượng ngẫu nhiên địa chỉ cho mỗi người dùng (ví dụ từ 1 đến 3 địa chỉ)
        const numAddresses = Math.floor(Math.random() * 3) + 2; // 1 đến 3 địa chỉ
        const addresses = [];

        for (let j = 0; j < numAddresses; j++) {
            addresses.push({
                phone: generateVietnamesePhoneNumber(),
                street: faker.address.streetName(),
                city: province.Code,
                district: district.Code,
                ward: ward.Code,
                type: faker.random.arrayElement(['home', 'office', 'other']),
                note: generateParagraph(200),
                default: j === 0, // Địa chỉ đầu tiên là mặc định
            });
        }

        // Tạo user với nhiều địa chỉ
        users.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            phone: generateVietnamesePhoneNumber(),
            password: await hashPassword('12345678'),
            role: faker.random.arrayElement(['customer', 'staff']),
            isActive: Math.random() > 0.5, // Random true or false
            addresses: addresses // Nhiều địa chỉ cho mỗi user
        });
    }

    // Chèn tất cả users vào cơ sở dữ liệu
    await User.insertMany(users);
    console.log(`${numUsers} fake users created!`);
};

module.exports = UserSeeder = async (count) => {
    await deleteAll();
    await createFakeUsers(count);
}

// deleteAll().then(() => createFakeUsers(10)).then(() => mongoose.connection.close());
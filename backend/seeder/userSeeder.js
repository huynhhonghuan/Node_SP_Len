const faker = require('faker');
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('../config/database');

// Kết nối đến MongoDB

connectDB();

// Hash mật khẩu
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Xóa dữ liệu cũ
const deleteAll = async () => {
    await User.deleteMany({});
    console.log('All users deleted!');
}

// Tạo dữ liệu giả và chèn vào cơ sở dữ liệu
const createFakeUsers = async (numUsers) => {
    const users = [];
    // Add a admin
    users.push({
        name: 'Admin',
        email: 'admin@example.com',
        password: await hashPassword('12345678'),//faker.internet.password()
        role: 'admin'
    });

    for (let i = 0; i < numUsers; i++) {
        users.push({
            name: faker.name.findName(),
            email: faker.internet.email(),
            password: await hashPassword('12345678'),//faker.internet.password()
            isActive: Math.random() > 0.5 // Random true or false
        });
    }

    await User.insertMany(users);
    console.log(`${numUsers} fake users created!`);
};

deleteAll()
    .then(() => createFakeUsers(50))
    .then(() => mongoose.connection.close());
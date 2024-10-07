const faker = require('faker');
const Chat = require('../models/chat');
const User = require('../models/user');
const mongoose = require('mongoose');
const connectDB = require('../config/database');

// Kết nối đến MongoDB nếu cần
// connectDB();

// Hàm để xóa toàn bộ dữ liệu trong bảng Chat
const deleteAllChats = async () => {
    await Chat.deleteMany({});
    console.log('Tất cả các cuộc trò chuyện đã được xóa!');
};

// Hàm để tạo dữ liệu tin nhắn giả
const createFakeChats = async (numChats) => {
    const chats = [];
    const users = await User.find(); // Lấy danh sách tất cả người dùng

    if (users.length === 0) {
        console.log('Không có người dùng nào để tạo cuộc trò chuyện!');
        return;
    }

    for (let i = 0; i < numChats; i++) {
        const randomCustomer = faker.random.arrayElement(users.filter(user => user.role === 'customer'));
        const randomStaff = faker.random.arrayElement(users.filter(user => user.role === 'staff'));

        const messages = [];
        const messageCount = faker.datatype.number({ min: 1, max: 10 }); // Số lượng tin nhắn ngẫu nhiên cho mỗi cuộc trò chuyện

        for (let j = 0; j < messageCount; j++) {
            messages.push({
                content: faker.lorem.sentence(),
                createdAt: faker.date.past(),
                reply: faker.random.arrayElement(['customer', 'shop']),
            });
        }

        chats.push({
            customerId: randomCustomer._id,
            recipientId: randomStaff._id,
            messages: messages,
            status: faker.random.arrayElement(['pending', 'received', 'processing', 'completed', 'cancelled']),
            startedAt: faker.date.past(),
            completedAt: faker.datatype.boolean() ? faker.date.recent() : null,
        });
    }

    await Chat.insertMany(chats);
    console.log(`${numChats} cuộc trò chuyện giả đã được tạo!`);
};

// Hàm seeder chính để xóa dữ liệu cũ và tạo mới
const ChatSeeder = async (count) => {
    await deleteAllChats();
    await createFakeChats(count);
};

// Gọi hàm seeder với số lượng cuộc trò chuyện bạn muốn tạo (ví dụ: 10)
// ChatSeeder(10).then(() => mongoose.connection.close());

module.exports = ChatSeeder;

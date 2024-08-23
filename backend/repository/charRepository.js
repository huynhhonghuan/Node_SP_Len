const Chat = require('../models/Chat');

class ChatRepository {
    async getAllChats() {
        return await Chat.find({});
    }
    async getChatById(id) {
        return await Chat.findById(id);
    }
    async createChat(chat) {
        return await Chat.create(chat);
    }
    async updateChat(id, updatedChat) {
        return await Chat.findByIdAndUpdate(id, updatedChat, { new: true });
    }
    async deleteChat(id) {
        return await Chat.findByIdAndDelete(id);
    }
}

module.exports = new ChatRepository();
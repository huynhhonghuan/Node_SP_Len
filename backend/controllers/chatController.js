const ChatRepository = require('../repository/charRepository');

const getAllChats = async (req, res) => {
    try {
        const chats = await ChatRepository.getAllChats();
        res.json({ data: chats, message: 'All chats' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getChatById = async (req, res) => {
    try {
        const chat = await ChatRepository.getChatById(req.params.id);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json({ data: chat, message: 'Chat retrieved' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createChat = async (req, res) => {
    try {
        const chat = await ChatRepository.createChat(req.body);
        res.status(201).json({ data: chat, message: 'Chat created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateChat = async (req, res) => {
    try {
        const updatedChat = await ChatRepository.updateChat(req.params.id, req.body);
        if (!updatedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json({ data: updatedChat, message: 'Chat updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteChat = async (req, res) => {
    try {
        const deletedChat = await ChatRepository.deleteChat(req.params.id);
        if (!deletedChat) {
            return res.status(404).json({ message: 'Chat not found' });
        }
        res.json({ message: 'Chat deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllChats,
    getChatById,
    createChat,
    updateChat,
    deleteChat,
};
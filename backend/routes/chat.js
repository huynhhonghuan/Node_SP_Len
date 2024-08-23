const chatRouter = require('express').Router();

const { validateObjectId, validateChatData } = require('../validators/chatValidator');

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

const {
    getAllChats,
    getChatById,
    createChat,
    updateChat,
    deleteChat,
} = require('../controllers/chatController');

// Middleware to use chat router only when authenticated and authorized to access it

// chatRouter.use(authMiddleware, authorizeRoles('admin', 'user'));

// Routes chat

chatRouter.route('/').get(getAllChats);

chatRouter.route('/:id').get(validateObjectId, getChatById);

chatRouter.route('/create').post(validateChatData, createChat);

chatRouter.route('/update/:id').put(validateObjectId, validateChatData, updateChat);

chatRouter.route('/delete/:id').delete(validateObjectId, deleteChat);

module.exports = chatRouter;
const chatbotRouter = require('express').Router();

const { authMiddleware, authorizeRoles } = require('../middleware/authMiddleware');

const {
    getQuestion,
} = require('../controllers/chatbotController');

// Routes

chatbotRouter.post('/', authMiddleware, authorizeRoles('customer'), getQuestion);

module.exports = chatbotRouter;
const { processQuestion, getAnswer } = require('../repository/chatbotRepository');

// const getQuestion = async (req, res) => {
//     try {
//         const { question, userId } = req.body;
//         const answer = await processQuestion(userId, question);
//         res.json({ answer });
//     }
//     catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// }

const getQuestion = async (req, res) => {
    try {
        const { question } = req.body;
        const answer = await getAnswer(question);
        res.json({ answer });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
module.exports = {
    getQuestion,
}
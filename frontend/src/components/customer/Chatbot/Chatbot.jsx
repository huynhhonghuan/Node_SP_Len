// src/components/QuestionForm.jsx

import React, { useState } from 'react';
import { getQuestion } from '../../../services/ChatbotService';

const QuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [history, setHistory] = useState([]); // Danh sách câu hỏi và câu trả lời

    const handleQuestionChange = (e) => {
        setQuestion(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Gọi API của bạn ở đây để lấy câu trả lời
        const response = await getQuestion(JSON.stringify({ question }));

        if (response) {
            setAnswer(response.answer); // Giả sử backend trả về { answer: '...' }
            setHistory(prev => [{ question, answer: response.answer }, ...prev]); // Lưu câu hỏi và câu trả lời vào lịch sử
            setQuestion(''); // Xóa dữ liệu trong input
        } else {
            setAnswer('Có lỗi xảy ra. Vui lòng thử lại.');
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center">Hỏi về sản phẩm</h1>
            <div className="card p-4 mt-4 shadow">
                <form onSubmit={handleSubmit} className="d-flex justify-content-center">
                    <input
                        type="text"
                        value={question}
                        onChange={handleQuestionChange}
                        placeholder="Nhập câu hỏi của bạn..."
                        required
                        className="form-control me-2"
                    />
                    <button type="submit" className="btn btn-primary">Hỏi</button>
                </form>

                {answer && (
                    <div className="mt-4">
                        <h5>Câu trả lời:</h5>
                        <div className="alert alert-info">{answer}</div>
                    </div>
                )}

                <div className="mt-4">
                    <h3>Lịch sử câu hỏi:</h3>
                    <ul className="list-group">
                        {history.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Câu hỏi:</strong> {item.question}<br />
                                <strong>Câu trả lời:</strong> {item.answer}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;

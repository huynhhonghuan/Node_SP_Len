import React, { useState } from 'react';
import { getQuestion } from '../../../services/ChatbotService';

const QuestionForm = () => {
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [history, setHistory] = useState([]); // Danh sách câu hỏi và câu trả lời

    // Hàm thay thế đường dẫn ảnh trong câu trả lời
    const renderAnswer = (answer) => {
        const apiUrl = import.meta.env.VITE_API_URL;

        if (!apiUrl) {
            console.error('VITE_API_URL is not defined!');
            return { __html: answer }; // Trả về nguyên bản nếu không tìm thấy apiUrl
        }

        // Cập nhật regex để tìm và thay thế liên kết bằng thẻ <a>
        const modifiedAnswer = answer
            .replace(/src="(?!http)(\/?assets\/images\/[^\"]+)"/g, `src="${apiUrl}/$1"`) // Thay thế đường dẫn ảnh
            .replace(
                /(http:\/\/localhost:3000\/product-detail\/[a-z0-9]+)/g, // Nhận diện liên kết chi tiết sản phẩm
                `<br>Link sản phẩm:<a href="$1" class="btn btn-success btn-sm ms-1" rel="noopener noreferrer">Xem sản phẩm</a>` // Thay bằng thẻ <a>
            );

        console.log('Modified Answer:', modifiedAnswer); // Kiểm tra kết quả

        return { __html: modifiedAnswer };
    };



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

                <span className="text-muted text-start mt-2">
                    <strong>Gợi ý:</strong> Đặt câu hỏi có chứa tên sản phẩm và thông tin cần hỏi. Ví dụ: <i>"Sản phẩm A có thông tin?"</i>
                </span>

                {answer && (
                    <div className="mt-4">
                        <h5>Câu trả lời:</h5>
                        <div className="alert alert-info">
                            {/* Dùng dangerouslySetInnerHTML để render câu trả lời có HTML */}
                            <div dangerouslySetInnerHTML={renderAnswer(answer)} />
                        </div>
                    </div>
                )}

                <div className="mt-4">
                    <h3>Lịch sử câu hỏi:</h3>
                    <ul className="list-group">
                        {history.map((item, index) => (
                            <li key={index} className="list-group-item">
                                <strong>Câu hỏi:</strong> {item.question}<br />
                                <strong>Câu trả lời:</strong> <div dangerouslySetInnerHTML={renderAnswer(item.answer)} />
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default QuestionForm;

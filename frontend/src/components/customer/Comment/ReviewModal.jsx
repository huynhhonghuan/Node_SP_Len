import React from 'react';

const ReviewModal = ({ show, onClose, onSave, productName, existingComment }) => {
    const [content, setContent] = React.useState(existingComment || '');

    const handleSave = () => {
        onSave(content); // Gửi nội dung đánh giá về parent
        onClose(); // Đóng modal
    };

    if (!show) return null;

    return (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Đánh giá sản phẩm: {productName}</h5>
                        <button type="button" className="btn-close" onClick={onClose}>
                        </button>
                    </div>
                    <div className="modal-body">
                        <textarea
                            className="form-control"
                            rows="4"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Nhập đánh giá của bạn..."
                        ></textarea>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={onClose}>
                            Đóng
                        </button>
                        <button type="button" className="btn btn-primary" onClick={handleSave}>
                            Lưu đánh giá
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;

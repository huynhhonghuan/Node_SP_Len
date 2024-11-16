import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRCode = ({ bankAccount, bankName, accountHolder, amount, invoiceId }) => {
    const [qrCodeUrl, setQrCodeUrl] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('Chưa thanh toán'); // Trạng thái thanh toán mặc định

    const generateQRCode = async () => {
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/payment/qr-code`,
                { bankAccount, bankName, accountHolder, amount, invoiceId }
            );
            setQrCodeUrl(response.data.qrCodeUrl);
        } catch (error) {
            console.error('Lỗi tạo mã QR thanh toán:', error);
        }
    };

    // Hàm giả lập kiểm tra trạng thái thanh toán
    const checkPaymentStatus = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/payment/status`,
                { params: { invoiceId } }
            );
            setPaymentStatus(response.data.status); // Cập nhật trạng thái từ API
        } catch (error) {
            console.error('Lỗi kiểm tra trạng thái thanh toán:', error);
        }
    };

    useEffect(() => {
        if (bankAccount && bankName && accountHolder && amount && invoiceId) {
            generateQRCode();
        }
    }, [bankAccount, bankName, accountHolder, amount, invoiceId]);

    // Kiểm tra trạng thái thanh toán mỗi 5 giây
    useEffect(() => {
        const interval = setInterval(() => {
            checkPaymentStatus();
        }, 5000);

        return () => clearInterval(interval); // Dọn dẹp interval khi component bị unmount
    }, [invoiceId]);

    return (
        <div className="container mt-4">
            {qrCodeUrl ? (
                <div className="row align-items-center border border-3 border-warning mb-2">
                    {/* Cột hiển thị mã QR */}
                    <div className="col-md-6 text-center">
                        <img src={qrCodeUrl} alt="Mã QR thanh toán" className="img-fluid" />
                    </div>
                    {/* Cột hiển thị thông tin thanh toán */}
                    <div className="col-md-6">
                        <h4>Thông tin</h4>
                        <ul className="list-unstyled">
                            <li><strong>Số tài khoản:</strong> {bankAccount}</li>
                            <li><strong>Ngân hàng:</strong> {bankName}</li>
                            <li><strong>Chủ tài khoản:</strong> {accountHolder}</li>
                            <li><strong>Số tiền:</strong> {amount.toLocaleString()} VND</li>
                            <li><strong>Mã hóa đơn:</strong> {invoiceId}</li>
                        </ul>
                        <h5>
                            <strong>Trạng thái thanh toán:</strong>{' '}
                            <span className={paymentStatus === 'Đã thanh toán' ? 'text-success' : 'text-danger'}>
                                {paymentStatus}
                            </span>
                        </h5>
                    </div>
                </div>
            ) : (
                <p>Đang tạo mã QR thanh toán...</p>
            )}
        </div>
    );
};

export default QRCode;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QRCode = ({ bankAccount, bankName, accountHolder, amount, invoiceId, cart }) => {
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

    // Hàm cập nhật trạng thái thanh toán bằng Button
    const handlePaymentStatusChange = async () => {
        try {
            const response = await axios.put(
                `${import.meta.env.VITE_API_URL}/payment/status`,
                { orderId: invoiceId, paymentStatus: 'completed' } // Cập nhật trạng thái thành "completed"
            );
            setPaymentStatus(response.data.paymentStatus); // Cập nhật trạng thái từ API
            alert('Cập nhật trạng thái đơn hàng thành công!');

            const cartItems = cart.map(item => ({
                productId: item._id,
                optionId: item.option._id,
                quantity: item.quantity,
                price: item.option.price,
            }));

            // Điều hướng hoặc cập nhật giỏ hàng
            localStorage.removeItem('address');
            localStorage.removeItem('paymethod');
            localStorage.removeItem('discount');

            const cartFromStorage = localStorage.getItem('cart');
            if (cartFromStorage) {
                const parsedCart = JSON.parse(cartFromStorage);
                const updatedCart = parsedCart.filter(storageItem =>
                    !cartItems.some(cartItem =>
                        cartItem.productId === storageItem._id && cartItem.optionId === storageItem.option._id
                    )
                );
                localStorage.setItem('cart', JSON.stringify(updatedCart));
            }

        } catch (error) {
            console.error('Lỗi cập nhật trạng thái thanh toán:', error);
            alert('Cập nhật trạng thái đơn hàng thất bại!');
        }
    };

    // Hàm giả lập kiểm tra trạng thái thanh toán
    const checkPaymentStatus = async () => {
        try {
            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/payment/status/${invoiceId}`,
            );
            setPaymentStatus(response.data.paymentStatus); // Cập nhật trạng thái từ API
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

    //Hàm sau khi cập nhật trạng thái thanh toán chuyển sang thông tin chi tiết đơn hàng đã đặt
    const handleViewOrderDetails = () => {
        window.location.href = `/customer/order/${invoiceId}`;
    };

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
                            <span className={paymentStatus === 'completed' ? 'text-success' : 'text-danger'}>
                                {paymentStatus === 'completed' ? 'Đã thanh toán' : 'Chưa thanh toán'}
                            </span>
                        </h5>
                        {/* Nút cập nhật trạng thái */}
                        <button
                            className="btn btn-primary btn-sm my-2"
                            onClick={handlePaymentStatusChange}
                            disabled={paymentStatus === 'completed'} // Vô hiệu hóa nếu đã thanh toán
                        >
                            Cập nhật trạng thái đơn hàng
                        </button>
                        {/* Nút xem thông tin chi tiết đơn hàng */}
                        {paymentStatus === 'completed' && (
                            <button
                                className="btn btn-success btn-sm my-2"
                                onClick={handleViewOrderDetails}
                            >
                                Hoàn thành đơn hàng
                            </button>
                        )}
                    </div>
                </div>
            ) : (
                <p>Đang tạo mã QR thanh toán...</p>
            )}
        </div>
    );
};

export default QRCode;

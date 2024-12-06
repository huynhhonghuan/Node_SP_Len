import React, { useEffect, useState } from 'react';
import './Payment.css';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Cập nhật lại import jwtDecode (không cần {}).
import { getUserById } from '../../../services/UserService';

import vietnamData from '../../../assets/vn_only_simplified_json_generated_data_vn_units.json'; // Import the JSON data
import { createOrder } from '../../../services/OrderService';
import { getDiscountById } from '../../../services/DiscountService';
import QRCode from '../Qrcode/Qrcode';

const Payment = () => {
    const [Address, setAddress] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [cart, setCart] = useState([]);
    const [userId, setUserId] = useState(null);
    const [feeship, setFeeShip] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [payMethod, setPayMethod] = useState('cod');

    const [isOrderPlaced, setIsOrderPlaced] = useState(false);

    // Hàm để tìm tên tỉnh/thành phố từ mã 'Code'
    const findCityName = (cityCode) => {
        const city = vietnamData.find(city => city.Code === cityCode);
        return city ? city.FullName : '';
    };

    // Hàm để tìm tên quận/huyện từ mã 'Code'
    const findDistrictName = (cityCode, districtCode) => {
        const city = vietnamData.find(city => city.Code === cityCode);
        const district = city?.District.find(district => district.Code === districtCode);
        return district ? district.FullName : '';
    };

    // Hàm để tìm tên phường/xã từ mã 'Code'
    const findWardName = (cityCode, districtCode, wardCode) => {
        const city = vietnamData.find(city => city.Code === cityCode);
        const district = city?.District.find(district => district.Code === districtCode);
        const ward = district?.Ward.find(ward => ward.Code === wardCode);
        return ward ? ward.FullName : '';
    };

    useEffect(() => {
        const token = Cookies.get('token');
        let userId = '';
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                userId = decodedToken.id; // Lấy userId từ token
                setUserId(userId); // Sửa 'userId' nếu API trả về nhiều người dùng
            } catch (error) {
                console.error('Token decoding error:', error);
            }
        }

        // Lấy dữ liệu địa chỉ theo id người dùng
        const fetchData = async () => {
            const data = await getUserById(userId);
            setAddress(data.addresses); // Sửa 'data.addresses' nếu API trả về nhiều địa chỉ
        }
        fetchData();

        // Lấy dữ liệu từ localStorage
        const cartlocal = localStorage.getItem('cart');
        if (cartlocal) {
            // Chuyển đổi dữ liệu JSON thành mảng đối tượng
            const parsedCartLocal = JSON.parse(cartlocal);

            // Lọc ra các sản phẩm có thuộc tính checked là true
            const filteredCartLocal = parsedCartLocal.filter(item => item.checked);

            // Gán giá trị đã lọc cho state cartlocal
            setCart(filteredCartLocal);
        }
        // Lấy dữ liệu từ localStorage
        const feeship = localStorage.getItem('feeship');

        if (feeship) {
            const free = JSON.parse(feeship);
            setFeeShip(free); // Sửa 'free' nếu API trả về nhiều giá trị
        }
        // Lấy dữ liệu từ localStorage
        const discount = localStorage.getItem('discount');

        if (discount) {
            // Chuyển chuỗi JSON thành đối tượng
            const discountData = JSON.parse(discount);

            // Sử dụng thuộc tính percentage từ đối tượng
            setDiscount(discountData.percentage / 100);
        }
        // Lấy dữ liệu từ localStorage
        const paymethod = localStorage.getItem('paymethod');
        if (paymethod) {
            // Chuyển chu��i JSON thành đối tượng
            // const paymethodData = JSON.parse(paymethod);

            setPayMethod(paymethod); // Sửa 'paymethod' nếu API trả về nhiều giá trị
        }
    }, []);

    // Hàm xử lý khi chọn địa chỉ
    const handleAddressSelect = (index) => {
        setSelectedAddress(index); // Lưu địa chỉ được chọn
        // Lưu địa chỉ vào local
        localStorage.setItem('address', JSON.stringify(Address[index])); // Sửa 'index' nếu API trả về nhiều địa chỉ
    };

    // Hàm xử lý đặt hàng
    const [showQRCode, setShowQRCode] = useState(false);
    const [qrCodeData, setQRCodeData] = useState(null);

    const handleOrder = async () => {
        if (selectedAddress === null) {
            alert("Bạn chưa chọn địa chỉ giao hàng.");
            return;
        }

        const payment = localStorage.getItem('paymethod');
        if (payment === null) {
            alert("Bạn chưa chọn hình thức thanh toán.");
            return;
        }

        const cartItems = cart.map(item => ({
            productId: item._id,
            optionId: item.option._id,
            quantity: item.quantity,
            price: item.option.price,
        }));

        const totalPrice = cart.reduce((total, item) => total + (item.quantity * item.option.price), 0)
            + feeship
            - (cart.reduce((total, item) => total + (item.quantity * item.option.price), 0) * discount);

        const orderData = {
            customerId: userId,
            products: cartItems,
            date: new Date(),
            totalPrice,
            note: '',
            paymentMethod: payment,
            feeShip: feeship,
            shippingAddress: Address[selectedAddress],
        };

        try {
            const response = await createOrder(orderData);

            if (response) {

                // Nếu phương thức thanh toán là chuyển khoản
                if (payment === 'transfer') {
                    alert("Tiến hành thanh toán chuyển khoản!");
                    setIsOrderPlaced(true); // Ẩn nút "Đặt hàng"
                    setQRCodeData({
                        bankAccount: '123456789',
                        bankName: 'VCB',
                        accountHolder: 'HUYNH THI MY TRANG',
                        amount: totalPrice,
                        invoiceId: response._id // Giả sử API trả về mã hóa đơn
                    });
                    setShowQRCode(true); // Hiển thị mã QR
                } else {
                    alert("Đặt hàng thành công!");
                    // Xử lý khi không phải chuyển khoản (COD, v.v.)
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
                }
            } else {
                alert("Đặt hàng thất bại. Vui lòng thử lại sau.");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Có lỗi xảy ra. Vui lòng thử lại.");
        }
    };


    return (
        <div className='payment m-5'>
            <div className="row">
                <div className="col-12 col-sm-6 col-md-7">
                    <h5>Chọn địa chỉ giao hàng</h5>
                    {Address.length > 0 ? (
                        Address.map((address, index) => (
                            <div key={index} className="address-item d-flex align-items-center">
                                <input
                                    type="radio"
                                    name="selectedAddress"
                                    value={index}
                                    onChange={() => handleAddressSelect(index)}
                                    checked={selectedAddress === index} // Địa chỉ được chọn
                                    className="me-2" // Thêm khoảng cách giữa input và label
                                />
                                <label className="d-flex flex-column">
                                    <span>{`Số điện thoại: ${address.phone}`}</span>
                                    <span>{`Địa chỉ: ${address.street}, ${findWardName(address.city, address.district, address.ward)}, ${findDistrictName(address.city, address.district)}, ${findCityName(address.city)}`}</span>
                                    <span>{`Loại địa chỉ: ${address.type}`}</span>
                                </label>
                            </div>
                        ))
                    ) : (
                        <p>Không có địa chỉ nào.</p>
                    )}
                </div>
                <div className="col-12 col-sm-6 col-md-5">
                    <div className="border border-3 border-warning p-3">
                        <h4 className='text-center'>Đơn hàng của bạn</h4>
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6>Sản phẩm</h6>
                            <h6>Tạm tính</h6>
                        </div>
                        <hr />
                        {cart && cart.map((item, index) => (
                            <div key={index} className="d-flex align-items-center justify-content-between mb-2">
                                <span>{item.name}</span>
                                <span>{item.quantity} x {item.option.price} đ</span>
                            </div>
                        ))}
                        <hr />
                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6>Phí vận chuyển</h6>
                            <h6>{feeship} đ</h6>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6>Giảm giá</h6>
                            <h6>{cart && cart.reduce((total, item) => total + (item.quantity * item.option.price), 0) * discount} đ</h6>
                        </div>

                        <div className="d-flex align-items-center justify-content-between mb-2">
                            <h6>Tổng tiền</h6>
                            <h6>{cart && cart.reduce((total, item) => total + (item.quantity * item.option.price), 0) + feeship - (cart.reduce((total, item) => total + (item.quantity * item.option.price), 0) * discount)} đ</h6>
                        </div>
                        <div className="d-flex align-items-center justify-content-center">
                            {!isOrderPlaced && (
                                <button className="btn btn-warning" onClick={handleOrder}>Đặt hàng</button>
                            )}
                        </div>

                    </div>

                    {showQRCode && qrCodeData && (
                        <QRCode
                            bankAccount={qrCodeData.bankAccount}
                            bankName={qrCodeData.bankName}
                            accountHolder={qrCodeData.accountHolder}
                            amount={qrCodeData.amount}
                            invoiceId={qrCodeData.invoiceId}
                            cart={cart}
                        />
                    )}

                </div>
            </div>
        </div>

    );
};

export default Payment;

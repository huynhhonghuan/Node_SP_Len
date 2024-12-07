import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { getDiscountByCode, getDiscountById } from "../../../services/DiscountService";
import { CustomToastContainer, ToastAction } from '../../Toast/Index';

const Card = () => {

    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [discount, setDiscount] = useState();
    const [discountPrice, setDiscountPrice] = useState(0);
    const [feeship, setFeeShip] = useState(15000);
    const [total, setTotal] = useState(0);
    const [payMethod, setPayMethod] = useState('cod');

    const navigate = useNavigate();

    useEffect(() => {
        // Lấy dữ liệu từ local storage
        const cartData = JSON.parse(localStorage.getItem('cart'));
        if (cartData) {
            setCart(cartData);
            // Tính t��ng giá trị
            setTotalPrice(cartData.reduce((acc, item) => acc + item.option.price * item.quantity, 0));
            // Tính t��ng
            // setTotal(totalPrice + feeship - discount);

            localStorage.setItem('paymethod', payMethod); // Cập nhật localStorage với giá trị mới
            localStorage.setItem('feeship', feeship);
        }
        console.log(cart);
    }, []);

    // Hàm cập nhật checked
    const handleCheckChange = (index, checked) => {
        // Tạo bản sao gi�� hàng
        const newCart = [...cart];
        // Cập nhật trạng thái checked theo chỉ mục
        newCart[index].checked = checked;
        // Cập nhật lại gi�� hàng
        setCart(newCart);
        // Lưu gi�� hàng mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // Hàm cập nhật số lượng sản phẩm
    const handleQuantityChange = (index, quantity) => {
        // Tạo bản sao gi�� hàng
        const newCart = [...cart];
        // Cập nhật số lượng sản phẩm theo chỉ mục
        newCart[index].quantity = quantity;
        // Cập nhật lại gi�� hàng
        setCart(newCart);
        // Lưu gi�� hàng mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // Hàm xử lý xóa sản phẩm
    const handleDelete = (index) => {
        // Tạo bản sao giỏ hàng
        const newCart = [...cart];
        // Xóa sản phẩm theo chỉ mục
        newCart.splice(index, 1);
        // Cập nhật lại giỏ hàng
        setCart(newCart);
        // Lưu giỏ hàng mới vào localStorage
        localStorage.setItem('cart', JSON.stringify(newCart));
    };

    // Hàm xử lý phương thức thanh toán
    const handlePaymentMethodChange = (e) => {
        const selectedPaymentMethod = e.target.value; // Lấy giá trị mới từ sự kiện
        setPayMethod(selectedPaymentMethod); // Cập nhật state
        localStorage.setItem('paymethod', selectedPaymentMethod); // Cập nhật localStorage với giá trị mới
    };

    const handleDiscountChange = (e) => {
        setDiscount(e.target.value);
    };

    // Hàm xử lý giảm giá
    const handleApplyDiscountCode = async (e) => {
        try {
            const token = Cookies.get('token');
            let userId = '';
            if (token) {
                try {
                    const decodedToken = jwtDecode(token);
                    userId = decodedToken.id; // Thay đ��i tùy thuộc vào cấu trúc token của bạn
                } catch (error) {
                    console.error('Token decoding error:', error);
                }
            }

            const reponse = await getDiscountByCode(discount);

            if (reponse.customersId.includes(userId)) {
                // alert('');
                ToastAction({ action: 'error', message: 'Bạn đã áp dụng mã giảm này rồi!' });
                localStorage.setItem('discount', '');
            }
            else if (totalPrice < reponse.lowestTotal) {
                // alert(`Đơn hàng thấp hơn giá trị để giảm giá! Đơn hàng phải từ ${reponse.lowestTotal} VND`);
                ToastAction({ action: 'error', message: 'Đơn hàng thấp hơn giá trị để giảm giá! Đơn hàng phải từ ${reponse.lowestTotal} VND' });
                localStorage.setItem('discount', '');
            }
            else if (reponse.counts <= 0) {
                // alert('Sản phẩm của bạn đã hết hạn sử dụng mã giảm giá!');
                ToastAction({ action: 'error', message: 'Sản phẩm của bạn đã hết hạn sử dụng mã giảm giá!' });
                localStorage.setItem('discount', '');
            }
            else if (totalPrice >= reponse.lowestTotal && reponse.counts > 0) {
                setDiscount(reponse._id);
                setDiscountPrice(reponse.percentage);
                localStorage.setItem('discount', JSON.stringify({
                    id: reponse._id,
                    percentage: reponse.percentage
                }));

                // alert("Áp dụng mã thành công!");
                ToastAction({ action: 'create', message: 'Áp dụng mã thành công!' });
            }
            else {
                // alert('Mã giảm giá không tồn tại!');
                ToastAction({ action: 'error', message: 'Mã giảm giá không tồn tại!' });
                localStorage.setItem('discount', '');
            }
        }
        catch (error) {
            console.error('Error getting discount:', error);
            // alert('Áp dụng mã giảm giá bị lỗi!');
            ToastAction({ action: 'error', message: 'Áp dụng mã giảm giá bị lỗi!' });
        } finally {
            setDiscount('');
        }
    };

    // Hàm xử lý đặt hàng
    const handlePayment = () => {
        if (cart.length === 0) {
            // alert('Giỏ hàng trống, vui lòng chọn sản phẩm!');
            ToastAction({ action: 'error', message: 'Giỏ hàng trống, vui lòng chọn sản phẩm!' });
            return;
        }

        // Thực hiện các kiểm tra khác nếu cần, như kiểm tra mã giảm giá, phương thức thanh toán, v.v.
        if (!payMethod) {
            // alert('Vui lòng chọn phương thức thanh toán!');
            ToastAction({ action: 'error', message: 'Vui lòng chọn phương thức thanh toán!' });
            return;
        }

        const token = Cookies.get('token');
        let userRole = '';
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                userRole = decodedToken.role; // Thay đ��i tùy thuộc vào cấu trúc token của bạn
            } catch (error) {
                console.error('Token decoding error:', error);
            }
        }

        // Nếu chưa đăng nhập thì hãy đăng nhập
        if (!token || userRole !== 'customer') {
            // alert('Bạn cần đăng nhập với quyền khách hàng để đặt hàng!');
            ToastAction({ action: 'error', message: 'Bạn cần đăng nhập với quyền khách hàng để đặt hàng!' });
            return;
        }

        // Chuyển luồng
        navigate('/payment');

        // Bạn có thể gửi dữ liệu này lên server hoặc xử lý tiếp.
        console.log('Đang xử lý thanh toán với dữ liệu:', paymentData);
    };

    return (
        <div className="card-main m-5">
            <div className="row">
                <div className="col-12 col-lg-8 mb-2">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Chọn</th>
                                <th scope="col">Hình</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col" width='10%'>Số lượng</th>
                                <th scope="col">Thành tiền</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cart.map((item, index) => (
                                <tr key={index}>
                                    <td className="text-center">
                                        <input
                                            type="checkbox"
                                            checked={item.checked}
                                            onChange={(e) => handleCheckChange(index, e.target.checked)}
                                        />
                                    </td>
                                    <td>
                                        <img
                                            src={`${import.meta.env.VITE_API_URL}/${item.option.image}`}
                                            alt={item.name}
                                            className="img-fluid"
                                            width="50"
                                        />
                                    </td>
                                    <td>{item.name}</td>
                                    <td>{item.option.price.toLocaleString()}đ</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="form-control"
                                            min="1"
                                            defaultValue={item.quantity}
                                            onChange={(e) => handleQuantityChange(index, Number(e.target.value))}
                                        />
                                    </td>
                                    <td>{(item.option.price * item.quantity).toLocaleString()}đ</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(index)}>
                                            <i className="fa-regular fa-trash-can"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                    <div className="d-flex justify-content-evenly align-items-center mt-3">
                        <button className="btn btn-secondary">Tiếp tục mua sắp</button>
                        {/* <button className="btn btn-warning">Cập nhật giỏ hàng</button> */}
                    </div>
                </div>
                <div className="col-12 col-lg-4 border border-3">
                    <h5 className="card-title text-uppercase fw-bold">Tổng giỏ hàng</h5>
                    <hr />
                    <div className="price d-flex justify-content-between">
                        <h6 className="card-subtitle mb-2 text-muted">Tạm tính: </h6>
                        <h6 className="text-warning">{totalPrice} VND</h6>
                    </div>

                    <div className="price d-flex justify-content-between">
                        <h6 className="card-subtitle mb-2 text-muted">Giảm: </h6>
                        <h6 className="text-success">{totalPrice * discountPrice / 100} VND</h6>
                    </div>

                    <div className="price d-flex flex-column justify-content-between mb-2">
                        <h6 className="card-subtitle mb-2 text-muted">Phương thức thanh toán:</h6>
                        <div className="d-flex">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" value={'cod'} checked={payMethod === 'cod'} onChange={(e) => handlePaymentMethodChange(e)} />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Tiền mặt
                                </label>
                            </div>
                            <div class="form-check ms-3">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" value={'transfer'} checked={payMethod === 'transfer'} onChange={(e) => handlePaymentMethodChange(e)} />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Chuyển khoản
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="price d-flex justify-content-between">
                        <h6 className="card-subtitle mb-2 text-muted">Phí vận chuyển: </h6>
                        <h6 className="text-info">{feeship} VND</h6>
                    </div>
                    {/* <div className="price d-flex justify-content-between">
                        <h6 className="card-subtitle mb-2 text-muted">Tổng tiền: </h6>
                        <h6 className="">{total} VND</h6>
                    </div> */}
                    <button type="button" className="btn btn-warning w-100" onClick={handlePayment}>Tiến hành thanh toán</button>
                    <h5 className="mt-4">Phiếu giảm giá</h5>
                    <hr />
                    <div className="price d-flex justify-content-between">
                        <div className="input-group">
                            <label>Mã giảm giá</label>
                            <input type="text" className="form-control ms-3" onChange={(e) => handleDiscountChange(e)} value={discount} />
                            <button type="button" className="btn btn-primary" onClick={handleApplyDiscountCode}>Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>
            <CustomToastContainer />
        </div>
    );
}

export default Card;
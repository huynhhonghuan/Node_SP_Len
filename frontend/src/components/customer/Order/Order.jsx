import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../../services/OrderService';
import { getProductById } from '../../../services/ProductService';
import AddressDisplay from '../Information/AddressDisplay';

const Order = () => {
    const { id } = useParams();
    const [order, setOrder] = useState(null);
    const [productNames, setProductNames] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getOrderById(id);
                if (response) {
                    setOrder(response);
                    // Fetch product names
                    const productNames = {};
                    for (const product of response.products) {
                        const productData = await getProductById(product.productId);
                        productNames[product.productId] = productData ? productData.name : 'Unknown product';
                    }
                    setProductNames(productNames);
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchData();
    }, [id]); // Include `id` as dependency to refetch if it changes

    const translateStatus = (status) => {
        switch (status) {
            case 'pending':
                return 'Đang chờ giải quyết';
            case 'processing':
                return 'Đang xử lý';
            case 'shipped':
                return 'Đã giao';
            case 'completed':
                return 'Hoàn thành';
            case 'failed':
                return 'Thất bại';
            default:
                return status;
        }
    };

    return (
        <div className='container'>
            {order ? (
                <div className='row gy-2'>
                    <div className="d-flex justify-content-center">
                        <h5 className="border rounded bg-light-subtle p-2">ĐƠN HÀNG - {order._id}</h5>
                    </div>

                    <div className="col-12 col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-uppercase">Thông tin đơn hàng</h5>
                                <hr />
                                <p>Số điện thoại: {order.shippingAddress.phone !== undefined ? order.shippingAddress.phone : ''}</p>
                                <p>
                                    <AddressDisplay
                                        cityId={order.shippingAddress.city !== undefined ? order.shippingAddress.city : ''}
                                        districtId={order.shippingAddress.district !== undefined ? order.shippingAddress.district : ''}
                                        wardId={order.shippingAddress.ward !== undefined ? order.shippingAddress.ward : ''}
                                        street={order.shippingAddress.street !== undefined ? order.shippingAddress.street : ''}
                                    />
                                </p>
                                <p>Ngày đặt hàng: {new Date(order.createdAt).toLocaleDateString()}</p>
                                <p>Tổng tiền: {order.totalPrice} đ</p>
                                <p>Trạng thái:
                                    <span className="btn btn-sm btn-info ms-2">
                                        {translateStatus(order.status)}
                                    </span>
                                </p>
                                Ghi chú: {order.note}
                            </div>
                        </div>

                    </div>
                    <div className="col-12 col-md-8">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title text-uppercase">Chi tiết đơn hàng</h5>
                                <hr />
                                <table className='table table-hover'>
                                    <thead>
                                        <tr>
                                            <th scope="col">STT</th>
                                            <th scope="col">Tên sản phẩm</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Đơn giá</th>
                                            <th scope="col">Thành tiền</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.products.map((product, i) => (
                                            <tr key={i}>
                                                <th scope="row">{i + 1}</th>
                                                <td>{productNames[product.productId] || 'Đang tải...'}</td>
                                                <td>{product.quantity}</td>
                                                <td>{product.price} đ</td>
                                                <td>{product.quantity * product.price} đ</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                    </div>
                </div>
            ) : (
                <p>Đang tải dữ liệu...</p>
            )}
        </div>
    );
};

export default Order;

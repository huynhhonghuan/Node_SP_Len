import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrdersByUserId } from '../../../services/OrderService';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const HistoryPay = () => {
    const [orderList, setOrderList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await Cookies.get('token');
                const user = await jwtDecode(token); // Đảm bảo import jwtDecode đúng cách
                const response = await getOrdersByUserId(user.id);

                if (Array.isArray(response)) {
                    setOrderList(response);
                    console.log('Fetched orders successfully');
                } else {
                    console.error('Expected an array, but got:', response);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <div className='customer mx-5'>
            <h4 className='text-center'>Lịch sử mua hàng</h4>
            <table className="table border border-warning table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã đơn hàng</th>
                        <th scope="col">Thời gian</th>
                        <th scope="col">Tổng tiền</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Chi tiết</th>
                    </tr>
                </thead>
                <tbody>
                    {orderList.map((item, i) => (
                        <tr key={i}>
                            <th scope="row">{i + 1}</th>
                            <td>{item._id}</td>
                            <td>{new Date(item.date).toLocaleString()}</td>
                            <td>{item.totalPrice}</td>
                            <td>
                                <span className='p-1 border border-info rounded'>
                                    {item.status === 'pending' ? 'Chờ giải quyết' : item.status === 'processing' ? 'Đã xác nhận' : item.status === 'shipped' ? 'Đang giao hàng' : item.status === 'completed' ? 'Đã giao hàng' : 'Thất bại'}
                                </span>
                            </td>
                            <td><Link to={`/customer/order/${item._id}`} className='btn btn-sm btn-info'>Chi tiết</Link></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default HistoryPay;

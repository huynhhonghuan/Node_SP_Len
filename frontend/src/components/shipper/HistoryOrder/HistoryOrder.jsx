import React, { useState, useEffect } from 'react';
import { getAllOrders, updateOrder } from '../../../services/OrderService';
import { Pagination } from 'react-bootstrap'; // Assuming you're using react-bootstrap for pagination

const HistoryOrder = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 9;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await getAllOrders();
                // Sort orders by date in descending order (newest first)
                const sortedOrders = response.sort((a, b) => new Date(b.date) - new Date(a.date));
                setOrders(sortedOrders);

            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchOrders();
    }, []);

    // Pagination logic
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Handle status change
    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await updateOrder(orderId, { status: newStatus }); // Update status in backend
            setOrders(prevOrders =>
                prevOrders.map(order =>
                    order._id === orderId ? { ...order, status: newStatus } : order
                )
            );
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <div className="container mx-1">
            <div className="row g-4">
                {currentOrders.map(order => (
                    <div key={order._id} className="col-12 col-sm-6 col-lg-4">
                        <div className="card order-card h-100">
                            <div className="card-body">
                                <h5 className="card-title">Mã đơn - {order._id}</h5>
                                <p className="card-text"><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
                                <div className="mb-2">
                                    <strong>Status:</strong>
                                    <select
                                        className="form-select"
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="pending">Đang chờ xác nhận</option>
                                        <option value="processing">Đang xử lý</option>
                                        <option value="shipped">Đang vận chuyển</option>
                                        <option value="completed">Đã hoàn thành</option>
                                        <option value="failed">Đơn hàng thất bại</option>
                                    </select>
                                </div>
                                {/* Additional details can be added here if needed */}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* Pagination */}
            <Pagination className="justify-content-center mt-4">
                {[...Array(Math.ceil(orders.length / ordersPerPage)).keys()].map(page => (
                    <Pagination.Item
                        key={page + 1}
                        active={page + 1 === currentPage}
                        onClick={() => paginate(page + 1)}
                    >
                        {page + 1}
                    </Pagination.Item>
                ))}
            </Pagination>
        </div>
    );
};

export default HistoryOrder;

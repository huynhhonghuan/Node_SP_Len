import React, { useEffect, useState } from 'react';
import { getOrdersByUserId } from '../../../services/OrderService';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createComment, getProductById, updateComment, updateProduct } from '../../../services/ProductService';
import ReviewModal from './ReviewModal';

const Comment = () => {
    const [completedOrders, setCompletedOrders] = useState([]); // State lưu các đơn hàng đã hoàn thành
    const [modalData, setModalData] = useState({ show: false, productName: '', existingComment: '', onSave: null });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const decodedToken = jwtDecode(Cookies.get('token'));
                const data = await getOrdersByUserId(decodedToken.id);

                const filteredOrders = data.filter(order => order.status === 'completed');
                const completedProducts = [];

                for (const order of filteredOrders) {
                    for (const product of order.products) {
                        const productData = await getProductById(product.productId);
                        const userComment = Array.isArray(productData.comments)
                            ? productData.comments.find(
                                (comment) => String(comment.userId) === String(decodedToken.id)
                            )
                            : null;

                        console.log('User Comment:', userComment);

                        completedProducts.push({
                            orderId: order._id,
                            productId: product.productId,
                            name: productData ? productData.name : 'Unknown product',
                            comment: userComment ? userComment.content : 'Chưa có đánh giá',
                        });
                    }
                }
                setCompletedOrders(completedProducts);
            } catch (error) {
                console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
            }
        };

        fetchData();
    }, []);

    const handleOpenModal = (product) => {
        setModalData({
            show: true,
            productName: product.name,
            existingComment: product.comment,
            onSave: (newComment) => handleSaveComment(product, newComment),
        });
    };

    const handleSaveComment = async (product, newComment) => {
        try {
            const decodedToken = jwtDecode(Cookies.get('token'));
            const userId = decodedToken.id;

            if (product.comment === 'Chưa có đánh giá') {
                // Chưa có đánh giá, tạo mới
                await createComment(product.productId, { userId, content: newComment });
            } else {
                // Đã có đánh giá, cần lấy commentId để cập nhật
                const productData = await getProductById(product.productId); // Lấy chi tiết sản phẩm
                const userComment = productData.comments.find(
                    (comment) => comment.userId === userId
                );

                if (userComment) {
                    await updateComment(product.productId, {
                        id: userComment._id, // Truyền id của comment
                        userId,
                        content: newComment,
                    });
                }
            }

            // Sau khi lưu, cập nhật state
            setCompletedOrders((prev) =>
                prev.map((item) =>
                    item.productId === product.productId
                        ? { ...item, comment: newComment }
                        : item
                )
            );
        } catch (error) {
            console.error('Lỗi khi lưu đánh giá:', error);
        }
    };


    return (
        <div className="customer mx-5">
            <h4 className="text-center">Lịch sử đánh giá</h4>
            <table className="table border border-warning table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Đánh giá</th>
                        <th scope="col">Thêm/Sửa đánh giá</th>
                    </tr>
                </thead>
                <tbody>
                    {completedOrders.map((order, index) => (
                        <tr key={order.productId}>
                            <th scope="row">{index + 1}</th>
                            <td>{order.name}</td>
                            <td>{order.comment}</td>
                            <td>
                                <button
                                    className="btn btn-sm btn-primary"
                                    onClick={() => handleOpenModal(order)}
                                >
                                    {order.comment === 'Chưa có đánh giá' ? 'Đánh giá' : 'Sửa đánh giá'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* Hiển thị modal khi show = true */}
            <ReviewModal
                show={modalData.show}
                productName={modalData.productName}
                existingComment={modalData.existingComment}
                onClose={() => setModalData({ ...modalData, show: false })}
                onSave={modalData.onSave}
            />
        </div>
    );
};

export default Comment;

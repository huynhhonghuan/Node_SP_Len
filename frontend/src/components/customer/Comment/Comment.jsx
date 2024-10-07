import React from 'react';

const Comment = () => {
    return (
        <div className='customer mx-5'>
            <h4 className='text-center'>Lịch sử đánh giá</h4>
            <table className="table border border-warning table-hover">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Mã đơn hàng</th>
                        <th scope="col">Sản phẩm</th>
                        <th scope="col">Nội dung</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Chi tiết</th>
                    </tr>
                </thead>
                <tbody>

                </tbody>
            </table>
        </div>
    )
}

export default Comment;
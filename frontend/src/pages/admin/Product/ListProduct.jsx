import React, { useEffect, useState } from "react";
import { getAllProducts } from "../../../services/ProductService";
import List from "../../../components/admin/ListComponent/List";
import { useNavigate } from "react-router-dom";

const ListProduct = () => {
    const [datas, setDatas] = useState([]);

    // Thiết lập headers tùy chỉnh
    const filteredHeaders = ['Tên sản phẩm', 'Mô tả', 'Hình ảnh', 'Loại', 'Ghi chú', 'Ngày tạo', 'Ngày sửa', 'SL phiên bản', 'SL đánh giá'];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllProducts();

                // Xử lý dữ liệu: giữ lại options và comments, nhưng thay giá trị bằng số lượng phần tử
                const filteredData = response.data.map(item => {
                    const { options, comments, __v, ...rest } = item;

                    return {
                        ...rest,
                        options: options ? options.length : 0,  // Đếm số lượng phần tử trong options
                        comments: comments ? comments.length : 0, // Đếm số lượng phần tử trong comments
                    };
                });

                setDatas(filteredData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, []); // Chỉ chạy useEffect một lần khi component mount
    const handleOncreate = () => {
        navigate('create'); // Chuyển hướng đến trang tạo mới sản phẩm
    }
    const handleOnUpdate = (item) => {
        // Logic cập nhật sản phẩm
    };

    const handleOnDelete = (item) => {
        // Logic xóa sản phẩm
    };

    return (
        <List
            title={'Sản phẩm'}
            datas={datas}
            headers={filteredHeaders} // Sử dụng headers đã chỉ định
            onCreate={handleOncreate}
            onUpdate={handleOnUpdate}
            onDelete={handleOnDelete}
        />
    );
};

export default ListProduct;

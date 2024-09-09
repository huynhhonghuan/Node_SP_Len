import React, { useEffect, useState } from "react";
import { getAllComboProducts } from "../../../services/ComboProductService";
import List from "../../../components/admin/ListComponent/List";
import { useNavigate } from "react-router-dom";

const ListComboProduct = () => {
    const [datas, setDatas] = useState([]);

    // Thiết lập headers tùy chỉnh
    const filteredHeaders = ['Tên combo', 'Mô tả', 'Giá', 'Ngày tạo', 'Ngày sửa', 'SL sản phẩm'];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllComboProducts();

                // Xử lý dữ liệu: giữ lại options và comments, nhưng thay giá trị bằng số lượng phần tử
                const filteredData = response.comboProducts.map(item => {
                    const { products, __v, ...rest } = item;

                    return {
                        ...rest,
                        products: products ? products.length : 0,  // Đếm số lượng phần tử trong options
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

export default ListComboProduct;

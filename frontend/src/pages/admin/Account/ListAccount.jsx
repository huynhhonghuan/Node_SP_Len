import React, { useEffect, useState } from "react";
import List from "../../../components/admin/ListComponent/List";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "../../../services/UserService";

const ListAccount = () => {
    const [datas, setDatas] = useState([]);

    // Thiết lập headers tùy chỉnh
    const filteredHeaders = ['Họ và tên', 'Email', 'SDT', 'Loại', 'Trạng thái', 'Ngày tạo', 'Ngày sửa', 'SL địa chỉ'];

    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUsers();

                // console.log(response.users);

                // Xử lý dữ liệu: giữ lại options và comments, nhưng thay giá trị bằng số lượng phần tử
                const filteredData = response.users.map(item => {
                    const { address, password, __v, ...rest } = item;

                    return {
                        ...rest,
                        address: address ? address.length : 0,  // Đếm số lượng phần tử trong options
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
            title={'Tài khoản'}
            datas={datas}
            headers={filteredHeaders} // Sử dụng headers đã chỉ định
            onCreate={handleOncreate}
            onUpdate={handleOnUpdate}
            onDelete={handleOnDelete}
        />
    );
};

export default ListAccount;

import React, { useEffect, useState } from "react";
import List from "../../../components/admin/ListComponent/List";
import { useNavigate, useLocation } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../../services/UserService";
import { CustomToastContainer, ToastAction } from '../../../components/Toast/Index';  // Import container cho toast

const ListAccount = () => {
    const [datas, setDatas] = useState([]);
    // Thiết lập headers tùy chỉnh
    const filteredHeaders = ['Họ và tên', 'Email', 'SDT', 'Loại', 'Trạng thái', 'Ngày tạo', 'Ngày sửa', 'SL địa chỉ'];
    const navigate = useNavigate();
    const location = useLocation();  // Sử dụng useLocation để lấy state từ navigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getAllUsers();

                // Xử lý dữ liệu: giữ lại options và comments, nhưng thay giá trị bằng số lượng phần tử
                const filteredData = response.users.map(item => {
                    const { addresses, password, __v, ...rest } = item;

                    return {
                        ...rest,
                        addresses: addresses ? addresses.length : 0,  // Đếm số lượng phần tử trong options
                    };
                });

                setDatas(filteredData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        // Kiểm tra nếu có thông báo trong state và hiển thị thông báo
        if (location.state?.message) {
            ToastAction({ action: location.state.action, message: location.state.message })

            // Reset state sau khi hiển thị thông báo để tránh hiện lại khi load trang
            navigate(location.pathname, { replace: true });  // Điều hướng lại về chính trang này mà không có state
        }
    }, [location.state, navigate, location.pathname]);  // Theo dõi location.state, navigate và pathname

    const handleOncreate = () => {
        navigate('create'); // Chuyển hướng đến trang tạo mới sản phẩm
    }

    const handleOnUpdate = (item) => {
        // Logic cập nhật sản phẩm
        navigate(`update/${item._id}`);  // Chuyển hướng đến trang cập nhật sản phẩm theo ID
    };

    const handleOnDelete = async (item) => {
        // Logic xóa sản phẩm
        try {
            const reponse = await deleteUser(item._id);
            if (reponse) {
                const updatedDatas = datas.filter(data => data._id !== item._id);
                setDatas(updatedDatas);
                ToastAction({ action: 'delete', message: 'Xóa tài khoản thành công!' });
            }
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <List
                title={'Tài khoản'}
                datas={datas}
                headers={filteredHeaders} // Sử dụng headers đã chỉ định
                onCreate={handleOncreate}
                onUpdate={handleOnUpdate}
                onDelete={handleOnDelete}
            />
            <CustomToastContainer />
        </>
    );
};

export default ListAccount;

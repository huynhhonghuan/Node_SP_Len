import React, { useEffect, useState } from "react";
import List from "../../../components/admin/ListComponent/List";
import { useNavigate, useLocation } from "react-router-dom";
import { CustomToastContainer, ToastAction } from '../../../components/Toast/Index';  // Import container cho toast
// import { deleteImage } from "../../../services/UploadImage";

const ListPage = ({ pageConfig }) => {
    const [datas, setDatas] = useState([]);
    const { title, header, header_hiddens, header_count, getData, deleteData, navigateCreate, navigateUpdate, nameDelete } = pageConfig; // Lấy các cấu hình từ pageConfig
    const navigate = useNavigate();
    const location = useLocation();  // Sử dụng useLocation để lấy state từ navigate

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getData();

                // Xử lý dữ liệu: loại bỏ các trường không cần thiết và xử lý tùy chỉnh
                const filteredData = response.map(item => {
                    // Loại bỏ các trường không cần thiết
                    let filteredItem = { ...item };

                    // Xử lý các trường cần đếm số lượng phần tử (header_count)
                    header_count.forEach((countKey, index) => {
                        if (filteredItem[countKey] && Array.isArray(filteredItem[countKey])) {
                            // filteredItem[countKey] = filteredItem[countKey].length;  // Gán số lượng phần tử vào trường tương ứng
                            filteredItem = { ...filteredItem, [countKey + '_count']: filteredItem[countKey].length }
                        } else {
                            filteredItem = { ...filteredItem, [countKey + '_count']: 0 }
                        }
                    });

                    // Loại bỏ các trường không cần thiết
                    header_hiddens.forEach(hiddenKey => {
                        delete filteredItem[hiddenKey]; // Loại bỏ trường trong danh sách cần ẩn
                    });

                    return filteredItem;
                });

                setDatas(filteredData);
                // console.log(nameDelete);
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
    }, [location.state, navigate, location.pathname, getData, header_hiddens, header_count]);  // Theo dõi location.state, navigate và pathname

    const handleOnCreate = () => {
        navigate(navigateCreate); // Chuyển hướng đến trang tạo mới sản phẩm
    }

    const handleOnUpdate = (item) => {
        // Logic cập nhật sản phẩm
        navigate(`${navigateUpdate}/${item._id}`);  // Chuyển hướng đến trang cập nhật sản phẩm theo ID
    };

    const handleOnDelete = async (item) => {
        // Logic xóa sản phẩm
        try {
            // if (item.image) {
            //     // Xóa ảnh trước khi xóa trong DB
            //     await deleteImage(item.image);  // Hàm xóa ảnh (cần tùy chỉnh)
            // }
            const response = await deleteData(item._id);
            if (response) {
                const updatedDatas = datas.filter(data => data._id !== item._id);
                setDatas(updatedDatas);
            }
            ToastAction({ action: 'delete', message: 'Xóa thành công!' });
        }
        catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <List
                title={title}
                datas={datas}
                headers={header} // Sử dụng headers từ pageConfig
                onCreate={handleOnCreate}
                onUpdate={handleOnUpdate}
                onDelete={handleOnDelete}
                nameDelete={nameDelete}
            />
            <CustomToastContainer />
        </>
    );
};

export default ListPage;

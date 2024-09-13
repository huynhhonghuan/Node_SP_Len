import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomToastContainer, ToastAction } from '../../../components/Toast/Index';  // Import container cho toast
import CreateAndUpdate from '../../../components/admin/CreateAndUpdateComponent/CreateAndUpdate';

const CreatePage = ({ pageConfig }) => {
    const navigate = useNavigate();

    // Lấy thông tin từ pageConfig.create
    const { title, createData, navigateList, formSchema } = pageConfig;

    const handleOnCreateAccount = async (formData) => {
        try {
            console.log('Form data:', formData);  // Kiểm tra dữ liệu trước khi gửi
            const response = await createData(formData);  // Sử dụng createData từ pageConfig
            if (response) {
                // Tự động chuyển đến trang danh sách tài khoản
                navigate(navigateList, { state: { action: 'create', message: 'Thêm thành công!' } });
            }
        } catch (error) {
            if (error.response) {
                console.error('Server response:', error.response.data);  // Log chi tiết phản hồi từ server
            }
            // Hiển thị thông báo lỗi
            ToastAction({ action: 'error', message: 'Có lỗi xảy ra khi thêm!' });
            throw error.response?.data?.errors;  // Bubble up error to the caller
        }
    };

    return (
        <div>
            <CreateAndUpdate
                title={title}
                isUpdate={false}
                onSubmit={handleOnCreateAccount}
                formSchema={formSchema}  // Sử dụng formSchema từ pageConfig
            />
            <CustomToastContainer />
        </div>
    );
};

export default CreatePage;

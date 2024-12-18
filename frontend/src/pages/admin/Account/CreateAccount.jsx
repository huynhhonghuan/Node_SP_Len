import React from 'react';
import { createUser } from '../../../services/UserService';
import { useNavigate } from 'react-router-dom';
import { CustomToastContainer, ToastAction } from '../../../components/Toast/Index';  // Import container cho toast
import { UserSchema } from '../../../formschema/UserSchema';
import CreateAndUpdate from '../../../components/admin/CreateAndUpdateComponent/CreateAndUpdate';

const CreateAccount = () => {
    const navigate = useNavigate();

    const handleOnCreateAccount = async (formData) => {
        try {
            console.log('Form data:', formData);  // Kiểm tra dữ liệu trước khi gửi
            const response = await createUser(formData);
            if (response) {
                // Tự động chuyển đến trang danh sách tài khoản
                navigate('/admin/account', { state: { action: 'create', message: 'Thêm thành công!' } });
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
                title="Người dùng"
                // existingData={existingData}
                isUpdate={false}
                onSubmit={handleOnCreateAccount}
                formSchema={UserSchema}
            />
            <CustomToastContainer />
        </div>
    );
};

export default CreateAccount;

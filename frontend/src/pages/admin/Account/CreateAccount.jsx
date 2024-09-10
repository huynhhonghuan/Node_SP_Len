import React from 'react';
import CreateAndUpdate from '../../../components/admin/Account/CreateAndUpdate';
import { CreateUser } from '../../../services/UserService';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const navigate = useNavigate();
    const handleOnCreateAccount = async (formData) => {
        try {
            console.log('Form data:', formData);  // Kiểm tra dữ liệu trước khi gửi
            const response = await CreateUser(formData);
            // console.log(response);
            if (response) {
                alert('Tạo tài khoản thành công!');
                // Tự đ��ng chuyển đến trang danh sách tài khoản
                navigate('/admin/account');
            }
        } catch (error) {
            // console.error('Error:', error);
            if (error.response) {
                console.error('Server response:', error.response.data);  // Log chi tiết phản hồi từ server
            }
            throw error.response.data.errors;  // Bubble up error to the caller
        }
    };

    return (
        <CreateAndUpdate title={'tài khoản'} onSubmit={handleOnCreateAccount} />
    );
};

export default CreateAccount;
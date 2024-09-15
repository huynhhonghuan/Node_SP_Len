import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomToastContainer, ToastAction } from '../../../components/Toast/Index';  // Import container cho toast
import CreateAndUpdate from '../../../components/admin/CreateAndUpdateComponent/CreateAndUpdate';
import { uploadImage } from '../../../services/UploadImage';

const CreatePage = ({ pageConfig }) => {
    const navigate = useNavigate();

    // Lấy thông tin từ pageConfig.create
    const { title, createData, navigateList, formSchema } = pageConfig;

    const handleOnCreateAccount = async (formData) => {
        try {
            console.log('Form data:', formData);  // Kiểm tra dữ liệu trước khi gửi

            // const uploadPromises = formSchema.map(async (field) => {
            //     if (field.type === 'file' && field.key === 'image' && formData[field.key]) {

            //         let newFile = new FormData();
            //         newFile.append(field.key, formData[field.key]);
            //         const response = await uploadImage(newFile);  // Gọi hàm uploadImage với formData
            //         formData[field.key] = await response.file.path;

            //     } else if (field.type === 'group' && formData[field.key]) {

            //         field.fields.map(async (field_item) => {
            //             if (field_item.type === 'file' && field_item.key === 'image') {
            //                 formData[field.key].map(async (item) => {
            //                     let newFile = new FormData();
            //                     newFile.append(field_item.key, item[field_item.key]);
            //                     const response = await uploadImage(newFile);  // Gọi hàm uploadImage với formData
            //                     item[field_item.key] = await response.file.path;
            //                 })
            //             }
            //         })
            //     }
            // });

            // Chờ tất cả các Promise hoàn thành
            // await Promise.all(uploadPromises);

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

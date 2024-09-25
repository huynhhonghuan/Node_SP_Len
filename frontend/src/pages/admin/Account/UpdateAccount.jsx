import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to extract id from URL
import { getUserById, updateUser } from '../../../services/UserService';
import { UserSchema } from '../../../formschema/UserSchema';
import CustomToastContainer from '../../../components/Toast/ToastContainer';
import CreateAndUpdate from '../../../components/admin/CreateAndUpdateComponent/CreateAndUpdate';

const UpdateAccount = () => {
    const { id } = useParams(); // Extract the id from the URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user data when component mounts
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await getUserById(id);
                    // console.log(response.users);
                    setUser(response.user);
                    setLoading(false); // Set loading state to false when data is fetched
                } catch (error) {
                    console.error(error);
                    setLoading(false); // Set loading state to false when error occurs
                }
            }
            fetchData();
        }
    }, [id]);

    const handleOnUpdateAccount = async (formData) => {
        console.log(`Update account: ${formData.name}`);
        try {
            const response = await updateUser(id, formData);
            if (response) {
                // Tự đ��ng chuyển đến trang danh sách tài khoản
                navigate('/admin/account', { state: { action: 'update', message: 'Tài khoản đã được cập nhật thành công!' } });
            }
        }
        catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <div>Loading...</div>; // Render loading state while fetching data
    }

    return (
        <div>
            <CreateAndUpdate
                title="Người dùng"
                existingData={user}
                isUpdate={true}
                onSubmit={handleOnUpdateAccount}
                formSchema={UserSchema}
            />
            <CustomToastContainer />
        </div>
    );
}

export default UpdateAccount;

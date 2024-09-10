import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to extract id from URL
import CreateAndUpdate from '../../../components/admin/Account/CreateAndUpdate';
import { getUserById } from '../../../services/UserService';

const UpdateAccount = () => {
    const { id } = useParams(); // Extract the id from the URL
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

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

    const handleOnUpdateAccount = (formData) => {
        // Logic for updating the account with form data
        console.log(`Update account: ${formData.name}`);
    }

    if (loading) {
        return <div>Loading...</div>; // Render loading state while fetching data
    }

    return (
        <CreateAndUpdate
            title={'tài khoản'}
            isUpdate={true}
            onSubmit={handleOnUpdateAccount}
            existingData={user} // Pass user data to the form for editing
        />
    );
}

export default UpdateAccount;

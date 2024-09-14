import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useParams to extract id from URL
import CustomToastContainer from '../../../components/Toast/ToastContainer';
import CreateAndUpdate from '../../../components/admin/CreateAndUpdateComponent/CreateAndUpdate';

const UpdatePage = ({ pageConfig }) => {
    const { id } = useParams(); // Extract the id from the URL
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state

    const navigate = useNavigate();

    // Extract configuration for update from pageConfig
    const { title, getData, updateData, navigateList, formSchema } = pageConfig;

    useEffect(() => {
        // Fetch data data when component mounts
        if (id) {
            const fetchData = async () => {
                try {
                    const response = await getData(id); // Use getData from pageConfig
                    setData(response);
                    setLoading(false); // Set loading state to false when data is fetched
                } catch (error) {
                    console.error(error);
                    setLoading(false); // Set loading state to false when error occurs
                }
            }
            fetchData();
        }
    }, [id, getData]);

    const handleOnUpdatePage = async (formData) => {
        console.log(`Update account: ${formData}`);
        try {
            const response = await updateData(id, formData); // Use updateData from pageConfig
            if (response) {
                // Automatically navigate to the list page
                navigate(navigateList, { state: { action: 'update', message: 'Cập nhật thành công!' } });
            }
        } catch (error) {
            console.error(error);
        }
    }

    if (loading) {
        return <div>Loading...</div>; // Render loading state while fetching data
    }

    return (
        <div>
            <CreateAndUpdate
                title={title} // Use title from pageConfig
                existingData={data}
                isUpdate={true}
                onSubmit={handleOnUpdatePage}
                formSchema={formSchema} // Use formSchema from pageConfig
            />
            <CustomToastContainer />
        </div>
    );
}

export default UpdatePage;

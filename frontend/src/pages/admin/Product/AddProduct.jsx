import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../../../services/ProductService';
import CreateAndUpdate from '../../../components/admin/Product/CreateAndUpdate';
import { CustomToastContainer } from '../../../components/Toast/Index';

const AddComboProduct = () => {
    const navigate = useNavigate();
    const handleOnCreateProduct = async (formData) => {
        try {
            const reponse = await createProduct(formData);
            if (reponse) {
                navigate('')
            }
        }
        catch (error) {

        }
    }

    return (
        <>
            <CreateAndUpdate title={'sản phẩm'} onSubmit={handleOnCreateProduct} />
            <CustomToastContainer />
        </>
    );
}

export default AddComboProduct;
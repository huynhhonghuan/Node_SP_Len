import React, { useState } from 'react';
import { uploadImage } from '../services/UploadImage';

const UploadImage = () => {
    const [file, setFile] = useState(null);  // Single file

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
        console.log(selectedFile);
    };

    // Handle form submission
    const handleFileUpload = async (event) => {
        event.preventDefault();

        if (file) {
            const formData = new FormData();
            formData.append('image', file);  // 'image' matches backend

            try {
                const response = await uploadImage(formData);
                console.log("Response from server:", response);
            } catch (error) {
                if (error.response) {
                    console.error("Response data:", error.response.data);
                } else {
                    console.error("Error uploading image:", error.message);
                }
            }
        } else {
            console.error("No file selected");
        }
    };

    return (
        <div>
            <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} />  {/* Single file */}
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default UploadImage;

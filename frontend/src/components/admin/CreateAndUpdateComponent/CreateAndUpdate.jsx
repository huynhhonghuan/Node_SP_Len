import React, { useState, useEffect } from 'react';
import { isValidDate } from '../../../app/isValidDate';
import { format, isValid } from 'date-fns';
import { uploadImage } from '../../../services/UploadImage';

const CreateAndUpdate = ({ title, existingData, isUpdate, onSubmit, formSchema }) => {
    const [formData, setFormData] = useState({});
    const [errorMessages, setErrorMessages] = useState({});
    const [expandedGroup, setExpandedGroup] = useState(null);
    const [options, setOptions] = useState([]);

    useEffect(() => {
        if (isUpdate && existingData) {
            setFormData(existingData);
        }
    }, [isUpdate, existingData]);

    const handleChange = (key, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [key]: value,
        }));
    };

    const handleGroupChange = (key, updatedData) => {
        setFormData(prevData => ({
            ...prevData,
            [key]: updatedData,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await onSubmit(formData);
            setErrorMessages({});
        } catch (error) {
            if (error) {
                const errorObj = {};
                error.forEach(err => {
                    errorObj[err.path] = err.msg;  // Gắn lỗi theo từng trường
                });
                setErrorMessages(errorObj);
                console.error(errorMessages);
            }
        }
    };

    return (
        <div className="container">
            <h3 className='text-light'>{isUpdate ? `${title}` : `${title}`}</h3>
            <form onSubmit={handleSubmit} >
                {formSchema.map((field) => (
                    <div key={field.key} className="mb-3">

                        {field.type === 'group' && !field.component ? '' : (<label>{field.label}</label>)}

                        {field.type === 'text' || field.type === 'email' || field.type === 'password' ? (
                            <input
                                type={field.type}
                                className="form-control"
                                value={formData[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                            />
                        ) : field.type === 'file' ? (
                            <input
                                type={field.type}
                                className="form-control"
                                // value={!isUpdate ? formData[field.key] : ''}
                                onChange={(e) => handleChange(field.key, e.target.files[0])}  // Không cần value
                            />
                        ) : field.type === 'number' ? (
                            <input
                                type={field.type}
                                className="form-control"
                                value={formData[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                                min={field.validation.minLength || 0}
                                max={field.validation.maxLength}
                                step={field.validation.step}
                            />
                        ) : field.type === 'date' ? (
                            <input
                                type={field.type}
                                className="form-control"
                                value={isValid(new Date(formData[field.key])) ? format(new Date(formData[field.key]), 'yyyy-MM-dd') : ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                            />
                        ) : field.type === 'select' ? (
                            <select
                                className="form-select"
                                value={formData[field.key] || ''}
                                onChange={(e) => handleChange(field.key, e.target.value)}
                            >
                                <option value="">Chọn {field.label}</option>
                                {field.options.map((option) => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        ) : field.type === 'radio' ? (
                            <div>
                                {field.options.map((option) => (
                                    <div key={option.value} className="form-check form-check-inline">
                                        <input
                                            type="radio"
                                            className="form-check-input"
                                            value={option.value}
                                            checked={formData[field.key] === option.value}
                                            onChange={() => handleChange(field.key, option.value)}
                                        />
                                        <label className="form-check-label">{option.label}</label>
                                    </div>
                                ))}
                            </div>
                        ) : field.type === 'group' && field.component ? (
                            // Sử dụng React.createElement để tạo component từ field.component
                            React.createElement(field.component, {
                                key: field.key,
                                fields: field.fields,
                                datas: formData[field.key] || [],
                                onDataChange: (updatedData) => handleGroupChange(field.key, updatedData),
                                expanded: expandedGroup === field.key,
                                toggleExpansion: () => setExpandedGroup(expandedGroup === field.key ? null : field.key),
                                errorMessages: errorMessages
                            })
                        ) : null}

                        {errorMessages[field.key] && (
                            <div className="text-danger">{errorMessages[field.key]}</div>
                        )}
                    </div>
                ))}
                <button type="submit" className="btn btn-primary">
                    {isUpdate ? 'Cập nhật' : 'Thêm mới'}
                </button>
            </form>
        </div>
    );
};

export default CreateAndUpdate;

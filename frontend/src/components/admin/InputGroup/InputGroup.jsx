import React, { useState, useEffect } from 'react';

const InputGroup = ({ datas = [], fields, onDataChange, expanded, toggleExpansion, errorMessages }) => {
    const [localDatas, setLocalDatas] = useState([]);

    useEffect(() => {
        if (JSON.stringify(datas) !== JSON.stringify(localDatas)) {
            setLocalDatas(datas);
        }
    }, [datas, localDatas]);

    const handleFieldChange = (index, key, value) => {
        const newData = [...localDatas];
        newData[index] = {
            ...newData[index],
            [key]: value
        };
        setLocalDatas(newData);
        onDataChange(newData);
    };

    const addOption = () => {
        const newData = {};
        setLocalDatas([...localDatas, newData]);
        onDataChange([...localDatas, newData]);
    };

    const removeOption = (index) => {
        const newData = localDatas.filter((_, i) => i !== index);
        setLocalDatas(newData);
        onDataChange(newData);
    };

    return (
        <div className="data-form">
            <button type="button" className="btn btn-success" onClick={toggleExpansion}>
                (Hiện tại có {localDatas.length}) {expanded ? '▼' : '▶'}
            </button>
            {expanded && (
                <div className='mt-2'>
                    {localDatas.map((data, index) => (
                        <div key={index} className="data-item mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                                <div className="bg-info btn me-3">
                                    Tùy chọn {index + 1}
                                </div>
                                <div className="">
                                    <button type="button" className="btn btn-danger" onClick={() => removeOption(index)}>
                                        Xóa
                                    </button>
                                </div>
                            </div>

                            <div className="row mb-2">
                                {fields.map((field) => (
                                    <div key={field.key} className="col-12 col-md-4 mb-3">
                                        <label>{field.label}</label>
                                        {field.type === 'text' || field.type === 'email' || field.type === 'password' ? (
                                            <input
                                                type={field.type}
                                                className="form-control"
                                                value={data[field.key] || ''}
                                                onChange={(e) => handleFieldChange(index, field.key, e.target.value)}
                                            />
                                        ) : field.type === 'file' ? (
                                            <input
                                                type={field.type}
                                                className="form-control"
                                                // value={data[field.key] && ''}
                                                onChange={(e) => handleFieldChange(index, field.key, e.target.files[0])}
                                            />
                                        ) : field.type === 'number' ? (
                                            <input
                                                type={field.type}
                                                className="form-control"
                                                value={data[field.key] || ''}
                                                onChange={(e) => handleFieldChange(index, field.key, e.target.value)}
                                                min={field.validation.minLength || 0}
                                                max={field.validation.maxLength}
                                                step={field.validation.step}
                                            />
                                        ) : field.type === 'date' ? (
                                            <input
                                                type={field.type}
                                                className="form-control"
                                                value={isValid(new Date(data[field.key])) ? format(new Date(data[field.key]), 'yyyy-MM-dd') : ''}
                                                onChange={(e) => handleFieldChange(index, field.key, e.target.value)}
                                            />
                                        ) : field.type === 'select' ? (
                                            <select
                                                className="form-select"
                                                value={data[field.key] || ''}
                                                onChange={(e) => handleFieldChange(index, field.key, e.target.value)}
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
                                                            checked={data[field.key] === option.value}
                                                            onChange={() => handleFieldChange(field.key, option.value)}
                                                        />
                                                        <label className="form-check-label">{option.label}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : null}
                                        {errorMessages[`dataes[${index}].${field.key}`] && (
                                            <div className="text-danger">{errorMessages[`dataes[${index}].${field.key}`]}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={addOption}>Thêm mới</button>
                </div>
            )}
        </div>
    );
};

export default InputGroup;

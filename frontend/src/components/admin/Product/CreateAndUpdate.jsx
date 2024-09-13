import React, { useEffect, useState } from "react";

const CreateAndUpdate = ({ title, existingData, isUpdate, onSubmit }) => {
    // State của form
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('');
    const [type, setType] = useState('');
    const [options, setOptions] = useState([]);
    const [note, setNote] = useState('');
    const [comments, setComment] = useState([]);

    const [expandedIndices, setExpandedIndices] = useState([]);
    const [errorMessages, setErrorMessages] = useState({});  // State lưu trữ lỗi

    useEffect(() => {
        if (isUpdate && existingData) {
            setName(existingData.name || '');
            setDescription(existingData.description || '');
            setImage(existingData.image || '');
            setType(existingData.type || '');
            setOptions(existingData.options || []);
            setNote(existingData.note || '');
            setComment(existingData.comments || []);
        }
    }, [isUpdate, existingData]);

    const handleAddOptions = () => {
        setOptions([...options, { image: '', quantity: 0, price: 0 }]);
        setExpandedIndices([...expandedIndices, true]);
    }
    const toggleOptionsForm = (index) => {
        const newexpandedIndices = [...expandedIndices];
        newexpandedIndices[index] = !newexpandedIndices[index];
        setExpandedIndices(newexpandedIndices);
    }
    const handleDeleteOptions = (index) => {
        setOptions(options.filter((_, i) => i !== index));
        setExpandedIndices(expandedIndices.filter((_, i) => i !== index));
    }
    const handleUpdateOptions = (index, field, value) => {
        const updateOpntions = options.map((option, i) => {
            i === index ? { ...options, [field]: value } : options
        });
        setOptions(updateOpntions)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            description,
            image,
            type,
            options,
            note,
            comments
        }
        try {
            const reponse = await onSubmit(formData);
            setErrorMessages({});
        }
        catch (error) {
            if (error) {
                const errorObj = {};
                error.forEach(err => {
                    errorObj[err.path] = err.msg;  // Gắn lỗi theo từng trường
                });
                setErrorMessages(errorObj);
            }
        }
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h3 className='text-light'>{isUpdate ? `Cập nhật ${title}` : `Thêm ${title}`}</h3>
                </div>
            </div>
            <form className="row needs-validation" onSubmit={handleSubmit} noValidate>
                <div className="col-12 col-md-6">
                    {errorMessages.name && <div className="text-end text-danger">{errorMessages.name}</div>}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Họ và tên</span>
                        <input
                            type="text"
                            className='form-control'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {errorMessages.email && <div className="text-end text-danger">{errorMessages.email}</div>}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Email</span>
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    {errorMessages.phone && <div className="text-end text-danger">{errorMessages.phone}</div>}
                    <div className="input-group mb-3">
                        <span className="input-group-text">Số điện thoại</span>
                        <input
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    {!isUpdate && (
                        <div className="">
                            {errorMessages.password && <div className="text-end text-danger">{errorMessages.password}</div>}
                            <div className="input-group mb-3">
                                <span className="input-group-text">Mật khẩu</span>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    )}
                    <div className="row">
                        <div className="col-6">
                            {errorMessages.role && <div className="text-end text-danger">{errorMessages.role}</div>}
                            <select className="form-select mb-3" value={role} onChange={(e) => setRole(e.target.value)}>
                                <option defaultValue={''}>Loại tài khoản</option>
                                <option value="customer">Khách hàng</option>
                                <option value="staff">Nhân viên</option>
                            </select>
                        </div>
                        <div className="col-6 mt-auto mb-3">
                            <div className="border border-light rounded d-flex justify-content-center align-items-center py-1">
                                <div className="form-check form-check-inline ">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="isActive"
                                        checked={isActive === true}
                                        onChange={() => setIsActive(true)}
                                    />
                                    <label className="form-check-label text-success fw-bold">Hoạt động</label>
                                </div>
                                <div className="form-check form-check-inline">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        name="isActive"
                                        checked={isActive === false}
                                        onChange={() => setIsActive(false)}
                                    />
                                    <label className="form-check-label text-danger fw-bold">Không</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    {addresses.map((address, index) => (
                        <div key={index} className="mb-3">
                            <button
                                type="button"
                                className="btn btn-success me-2"
                                onClick={() => toggleAddressForm(index)}
                            >
                                Địa chỉ {index + 1} {expandedIndices[index] ? <i className="fa-solid fa-chevron-up"></i> : <i className="fa-solid fa-angle-down"></i>}
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() => handleDeleteAddress(index)}
                            >
                                Xóa
                            </button>

                            {expandedIndices[index] && (
                                <div className='mt-2'>
                                    <div className="row">
                                        <div className="col-4">
                                            <select
                                                className="form-select mb-3"
                                                value={address.city}
                                                onChange={(e) => handleCityChange(index, e.target.value)}
                                            >
                                                <option value="">Thành phố/Tỉnh</option>
                                                {vietnamData.map(city => (
                                                    <option key={city.Code} value={city.Code}>{city.FullName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <select
                                                className="form-select mb-3"
                                                value={address.district}
                                                onChange={(e) => handleDistrictChange(index, e.target.value)}
                                                disabled={!address.districts || address.districts.length === 0}
                                            >
                                                <option value="">Quận/huyện</option>
                                                {address.districts && address.districts.map(district => (
                                                    <option key={district.Code} value={district.Code}>{district.FullName}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="col-4">
                                            <select
                                                className="form-select mb-3"
                                                value={address.ward}
                                                onChange={(e) => handleAddressChange(index, 'ward', e.target.value)}
                                                disabled={!address.wards || address.wards.length === 0}
                                            >
                                                <option value="">Phường/xã</option>
                                                {address.wards && address.wards.map(ward => (
                                                    <option key={ward.Code} value={ward.Code}>{ward.FullName}</option>
                                                ))}
                                            </select>
                                        </div>

                                    </div>


                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Đường/Thôn</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={address.street}
                                            onChange={(e) => handleAddressChange(index, 'street', e.target.value)}
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="input-group mb-3">
                                                <span className="input-group-text">Số điện thoại</span>
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    value={address.phone}
                                                    onChange={(e) => handleAddressChange(index, 'phone', e.target.value)}
                                                />
                                            </div>
                                        </div>
                                        <div className="col-6">
                                            <select
                                                className="form-select mb-3"
                                                value={address.type}
                                                onChange={(e) => handleAddressChange(index, 'type', e.target.value)}
                                            >
                                                <option value="">Loại địa chỉ</option>
                                                <option value="home">Nhà riêng</option>
                                                <option value="office">Văn phòng</option>
                                                <option value="other">Khác</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="input-group mb-3">
                                        <span className="input-group-text">Ghi chú</span>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={address.note}
                                            onChange={(e) => handleAddressChange(index, 'note', e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        className="btn btn-warning mb-3"
                        onClick={handleAddAddress}
                    >
                        Thêm địa chỉ
                    </button>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">{isUpdate ? `Cập nhật` : `Thêm mới`}</button>
                </div>
            </form>
        </div>
    )
}
export default CreateAndUpdate;
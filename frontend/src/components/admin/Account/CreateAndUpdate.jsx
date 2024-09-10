import React, { useState, useEffect } from 'react';
import './CreateAndUpdate.css';
import vietnamData from '../../../../src/assets/vn_only_simplified_json_generated_data_vn_units.json'; // Import the JSON data

const CreateAndUpdate = ({ title, existingData, isUpdate, onSubmit }) => {
    // State quản lý form
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [isActive, setIsActive] = useState(true);
    const [addresses, setAddresses] = useState([]);
    const [expandedIndices, setExpandedIndices] = useState([]);

    const [errorMessages, setErrorMessages] = useState({});  // State lưu trữ lỗi

    useEffect(() => {
        if (isUpdate && existingData) {
            setName(existingData.name || '');
            setEmail(existingData.email || '');
            setPhone(existingData.phone || '');
            setRole(existingData.role || '');
            setIsActive(existingData.isActive || false);
            setAddresses(existingData.addresses || []);
            setExpandedIndices(existingData.addresses.map(() => false));

            // Nếu dữ liệu đã tồn tại, load city/district/ward
            const updatedAddresses = existingData.addresses.map(address => {
                const selectedCity = vietnamData.find(city => city.Code === String(address.city));
                const districts = selectedCity ? selectedCity.District : [];
                const selectedDistrict = districts.find(district => district.Code === String(address.district));
                const wards = selectedDistrict ? selectedDistrict.Ward : [];

                console.log(wards);

                return {
                    ...address,
                    districts,  // Load quận/huyện theo thành phố đã chọn
                    wards       // Load phường/xã theo quận/huyện đã chọn
                };

            });
            setAddresses(updatedAddresses);
        }
    }, [isUpdate, existingData]);


    const handleAddAddress = () => {
        setAddresses([...addresses, { phone: '', type: '', city: '', district: '', ward: '', street: '', note: '' }]);
        setExpandedIndices([...expandedIndices, true]);
    };

    const toggleAddressForm = (index) => {
        const newExpandedIndices = [...expandedIndices];
        newExpandedIndices[index] = !newExpandedIndices[index];
        setExpandedIndices(newExpandedIndices);
    };

    const handleDeleteAddress = (index) => {
        setAddresses(addresses.filter((_, i) => i !== index));
        setExpandedIndices(expandedIndices.filter((_, i) => i !== index));
    };

    const handleAddressChange = (index, field, value) => {
        const updatedAddresses = addresses.map((address, i) =>
            i === index ? { ...address, [field]: value } : address
        );
        setAddresses(updatedAddresses);
    };

    const handleCityChange = (index, cityCode) => {
        const selectedCity = vietnamData.find(city => city.Code === cityCode);
        const updatedDistricts = selectedCity ? selectedCity.District : [];

        const updatedAddresses = addresses.map((address, i) =>
            i === index ? { ...address, city: cityCode, district: '', ward: '', districts: updatedDistricts, wards: [] } : address
        );
        setAddresses(updatedAddresses);
    };

    const handleDistrictChange = (index, districtCode) => {
        const selectedDistrict = addresses[index].districts.find(district => district.Code === districtCode);
        const updatedWards = selectedDistrict ? selectedDistrict.Ward : [];

        const updatedAddresses = addresses.map((address, i) =>
            i === index ? { ...address, district: districtCode, ward: '', wards: updatedWards } : address
        );
        setAddresses(updatedAddresses);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            name,
            email,
            phone,
            password,
            role,
            isActive,
            addresses
        };

        try {
            const rep = await onSubmit(formData);
            setErrorMessages({});  // Reset errors nếu thành công
        } catch (error) {
            if (error) {
                const errorObj = {};
                error.forEach(err => {
                    errorObj[err.path] = err.msg;  // Gắn lỗi theo từng trường
                });
                setErrorMessages(errorObj);
            }
        }
    };

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
                        <div className="col-6 d-flex justify-content-start text-center mb-3">
                            <div className="border border-light rounded pt-1 ps-2">
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
    );
};

export default CreateAndUpdate;
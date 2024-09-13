import React, { useState, useEffect } from 'react';
import vietnamData from '../../../assets/vn_only_simplified_json_generated_data_vn_units.json'; // Import the JSON data

const AddressForm = ({ addresses = [], onAddressChange, expanded, toggleExpansion, errorMessages }) => {
    const [localAddresses, setLocalAddresses] = useState([]);

    useEffect(() => {
        const updateAddresses = addresses.map(address => {
            const selectedCity = vietnamData.find(city => city.Code === address.city);
            const updatedDistricts = selectedCity ? selectedCity.District : [];
            const selectedDistrict = updatedDistricts.find(district => district.Code === address.district);
            const updatedWards = selectedDistrict ? selectedDistrict.Ward : [];

            return {
                ...address,
                districts: updatedDistricts,
                wards: updatedWards
            };
        });

        setLocalAddresses(updateAddresses);
    }, [addresses]);

    const handleCityChange = (index, cityCode) => {
        const selectedCity = vietnamData.find(city => city.Code === cityCode);
        const updatedDistricts = selectedCity ? selectedCity.District : [];
        const newAddresses = [...localAddresses];
        newAddresses[index] = {
            ...newAddresses[index],
            city: cityCode,
            districts: updatedDistricts,
            district: '',
            ward: '',
            wards: []
        };
        setLocalAddresses(newAddresses);
        onAddressChange(newAddresses);
    };

    const handleDistrictChange = (index, districtCode) => {
        const selectedDistrict = localAddresses[index].districts?.find(district => district.Code === districtCode);
        const updatedWards = selectedDistrict ? selectedDistrict.Ward : [];
        const newAddresses = [...localAddresses];
        newAddresses[index] = {
            ...newAddresses[index],
            district: districtCode,
            ward: '',
            wards: updatedWards
        };
        setLocalAddresses(newAddresses);
        onAddressChange(newAddresses);
    };

    const handleFieldChange = (index, key, value) => {
        const newAddresses = [...localAddresses];
        newAddresses[index] = {
            ...newAddresses[index],
            [key]: value
        };
        setLocalAddresses(newAddresses);
        onAddressChange(newAddresses);
    };

    const addAddress = () => {
        const newAddress = { city: '', districts: [], district: '', wards: [], ward: '', street: '', type: '', note: '', default: false };
        setLocalAddresses([...localAddresses, newAddress]);
        onAddressChange([...localAddresses, newAddress]);
    };

    const removeAddress = (index) => {
        const newAddresses = localAddresses.filter((_, i) => i !== index);
        setLocalAddresses(newAddresses);
        onAddressChange(newAddresses);
    };

    return (
        <div className="address-form">
            <button type="button" className="btn btn-success" onClick={toggleExpansion}>
                Địa chỉ (Hiện tại có {localAddresses.length}) {expanded ? '▼' : '▶'}
            </button>
            {expanded && (
                <div>
                    {localAddresses.map((address, index) => (
                        <div key={index} className="address-item mt-2">
                            <div className="d-flex justify-content-start align-items-center mb-2">
                                <div className="">
                                    Địa chỉ {index + 1}
                                </div>
                                <div className="">
                                    <button type="button" className="btn btn-danger" onClick={() => removeAddress(index)}>
                                        Xóa
                                    </button>
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-4">
                                    <select className="form-select" value={address.city} onChange={(e) => handleCityChange(index, e.target.value)}>
                                        <option value="">Thành phố/Tỉnh</option>
                                        {vietnamData.map(city => (
                                            <option key={city.Code} value={city.Code}>{city.FullName}</option>
                                        ))}
                                    </select>
                                    {errorMessages[`addresses[${index}].city`] && (
                                        <div className="text-danger">{errorMessages[`addresses[${index}].city`]}</div>
                                    )}
                                </div>
                                <div className="col-4">
                                    <select className="form-select" value={address.district} onChange={(e) => handleDistrictChange(index, e.target.value)} disabled={!Array.isArray(address.districts) || !address.districts.length}>
                                        <option value="">Quận/Huyện</option>
                                        {Array.isArray(address.districts) && address.districts.map(district => (
                                            <option key={district.Code} value={district.Code}>{district.FullName}</option>
                                        ))}
                                    </select>
                                    {errorMessages[`addresses[${index}].district`] && (
                                        <div className="text-danger">{errorMessages[`addresses[${index}].district`]}</div>
                                    )}
                                </div>
                                <div className="col-4">
                                    <select className="form-select" value={address.ward} onChange={(e) => handleFieldChange(index, 'ward', e.target.value)} disabled={!Array.isArray(address.wards) || !address.wards.length}>
                                        <option value="">Phường/Xã</option>
                                        {Array.isArray(address.wards) && address.wards.map(ward => (
                                            <option key={ward.Code} value={ward.Code}>{ward.FullName}</option>
                                        ))}
                                    </select>
                                    {errorMessages[`addresses[${index}].ward`] && (
                                        <div className="text-danger">{errorMessages[`addresses[${index}].ward`]}</div>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-8">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Đường phố"
                                        value={address.street}
                                        onChange={(e) => handleFieldChange(index, 'street', e.target.value)}
                                    />
                                    {errorMessages[`addresses[${index}].street`] && (
                                        <div className="text-danger">{errorMessages[`addresses[${index}].street`]}</div>
                                    )}
                                </div>
                                <div className="col-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Số điện thoại"
                                        value={address.phone}
                                        onChange={(e) => handleFieldChange(index, 'phone', e.target.value)}
                                    />
                                    {errorMessages[`addresses[${index}].phone`] && (
                                        <div className="text-danger">{errorMessages[`addresses[${index}].phone`]}</div>
                                    )}
                                </div>
                                <div className="col-2">
                                    <select
                                        className="form-select"
                                        value={address.type}
                                        onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                                    >
                                        <option value="">Loại địa chỉ</option>
                                        <option value="home">Nhà riêng</option>
                                        <option value="office">Văn phòng</option>
                                        <option value="other">Khác</option>
                                    </select>
                                    {errorMessages[`addresses[${index}].type`] && (
                                        <div className="text-danger">{errorMessages[`addresses[${index}].type`]}</div>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-12">
                                    <textarea
                                        className="form-control"
                                        placeholder="Ghi chú"
                                        value={address.note}
                                        onChange={(e) => handleFieldChange(index, 'note', e.target.value)}
                                        maxLength="200"
                                    />
                                    {errorMessages[`addresses[${index}].note`] && (
                                        <div className="text-danger">{errorMessages[`addresses[${index}].note`]}</div>
                                    )}
                                </div>
                            </div>

                            <div className="row mb-2">
                                <div className="col-12">
                                    <div className="input-group-append d-flex">
                                        <label className='me-2'>Mặc định</label>
                                        <div className="input-group-text me-3">
                                            <input
                                                type="radio"
                                                id={`default-yes-${index}`}
                                                name={`default-${index}`}
                                                value={true}
                                                checked={address.default === true}
                                                onChange={() => handleFieldChange(index, 'default', true)}
                                            />
                                            Có
                                        </div>
                                        <div className="input-group-text">
                                            <input
                                                type="radio"
                                                id={`default-no-${index}`}
                                                name={`default-${index}`}
                                                value={false}
                                                checked={address.default === false}
                                                onChange={() => handleFieldChange(index, 'default', false)}
                                            />
                                            Không
                                        </div>
                                        {errorMessages[`addresses[${index}].default`] && (
                                            <div className="text-danger">{errorMessages[`addresses[${index}].default`]}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                    <button type="button" className="btn btn-primary" onClick={addAddress}>Thêm địa chỉ</button>
                </div>
            )}
        </div>
    );
};

export default AddressForm;

import React, { useState, useEffect } from 'react';
import vietnamData from '../../../assets/vn_only_simplified_json_generated_data_vn_units.json'; // Import the JSON data

const AddressForm = ({ datas = [], onDataChange, expanded, toggleExpansion, errorMessages }) => {
    const [localDatas, setLocalDatas] = useState([]);

    useEffect(() => {
        const updateDatas = datas.map(address => {
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

        // Chỉ cập nhật trạng thái nếu có sự thay đổi
        if (JSON.stringify(updateDatas) !== JSON.stringify(localDatas)) {
            setLocalDatas(updateDatas);
        }
    }, [datas, localDatas]); // Đảm bảo dependency array đúng

    const handleCityChange = (index, cityCode) => {
        const selectedCity = vietnamData.find(city => city.Code === cityCode);
        const updatedDistricts = selectedCity ? selectedCity.District : [];
        const newData = [...localDatas];
        newData[index] = {
            ...newData[index],
            city: cityCode,
            districts: updatedDistricts,
            district: '',
            ward: '',
            wards: []
        };
        setLocalDatas(newData);
        onDataChange(newData);
    };

    const handleDistrictChange = (index, districtCode) => {
        const selectedDistrict = localDatas[index].districts?.find(district => district.Code === districtCode);
        const updatedWards = selectedDistrict ? selectedDistrict.Ward : [];
        const newData = [...localDatas];
        newData[index] = {
            ...newData[index],
            district: districtCode,
            ward: '',
            wards: updatedWards
        };
        setLocalDatas(newData);
        onDataChange(newData);
    };

    const handleFieldChange = (index, key, value) => {
        const newData = [...localDatas];
        newData[index] = {
            ...newData[index],
            [key]: value
        };
        setLocalDatas(newData);
        onDataChange(newData);
    };

    const addAddress = () => {
        const newAddress = { phone: '', city: '', districts: [], district: '', wards: [], ward: '', street: '', type: '', note: '', default: false };
        setLocalDatas([...localDatas, newAddress]);
        onDataChange([...localDatas, newAddress]);
    };

    const removeAddress = (index) => {
        const newData = localDatas.filter((_, i) => i !== index);
        setLocalDatas(newData);
        onDataChange(newData);
    };

    return (
        <div className="address-form">
            <button type="button" className="btn btn-success" onClick={toggleExpansion}>
                Địa chỉ (Hiện tại có {localDatas.length}) {expanded ? '▼' : '▶'}
            </button>
            {expanded && (
                <div>
                    {localDatas.map((address, index) => (
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
                                    {errorMessages[`datas[${index}].city`] && (
                                        <div className="text-danger">{errorMessages[`datas[${index}].city`]}</div>
                                    )}
                                </div>
                                <div className="col-4">
                                    <select className="form-select" value={address.district} onChange={(e) => handleDistrictChange(index, e.target.value)} disabled={!Array.isArray(address.districts) || !address.districts.length}>
                                        <option value="">Quận/Huyện</option>
                                        {Array.isArray(address.districts) && address.districts.map(district => (
                                            <option key={district.Code} value={district.Code}>{district.FullName}</option>
                                        ))}
                                    </select>
                                    {errorMessages[`datas[${index}].district`] && (
                                        <div className="text-danger">{errorMessages[`datas[${index}].district`]}</div>
                                    )}
                                </div>
                                <div className="col-4">
                                    <select className="form-select" value={address.ward} onChange={(e) => handleFieldChange(index, 'ward', e.target.value)} disabled={!Array.isArray(address.wards) || !address.wards.length}>
                                        <option value="">Phường/Xã</option>
                                        {Array.isArray(address.wards) && address.wards.map(ward => (
                                            <option key={ward.Code} value={ward.Code}>{ward.FullName}</option>
                                        ))}
                                    </select>
                                    {errorMessages[`datas[${index}].ward`] && (
                                        <div className="text-danger">{errorMessages[`datas[${index}].ward`]}</div>
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
                                    {errorMessages[`datas[${index}].street`] && (
                                        <div className="text-danger">{errorMessages[`datas[${index}].street`]}</div>
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
                                    {errorMessages[`datas[${index}].phone`] && (
                                        <div className="text-danger">{errorMessages[`datas[${index}].phone`]}</div>
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
                                    {errorMessages[`datas[${index}].type`] && (
                                        <div className="text-danger">{errorMessages[`datas[${index}].type`]}</div>
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
                                    {errorMessages[`datas[${index}].note`] && (
                                        <div className="text-danger">{errorMessages[`datas[${index}].note`]}</div>
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
                                        {errorMessages[`datas[${index}].default`] && (
                                            <div className="text-danger">{errorMessages[`datas[${index}].default`]}</div>
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

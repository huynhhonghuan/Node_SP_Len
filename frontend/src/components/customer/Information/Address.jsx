import React, { useState, useEffect } from 'react';
import vietnamData from '../../../assets/vn_only_simplified_json_generated_data_vn_units.json'; // Import JSON data

const AddressForm = ({ currentAddress, handleAddressChange }) => {
    const [provinces, setProvinces] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [wards, setWards] = useState([]);

    useEffect(() => {
        // Tải dữ liệu tỉnh thành từ JSON
        setProvinces(vietnamData);

        // Gán lại danh sách quận/huyện và phường/xã nếu có
        if (currentAddress.city) {
            const selectedCity = provinces.find((province) => province.Code === currentAddress.city);
            if (selectedCity) {
                setDistricts(selectedCity.District);
            }
        }
    }, [currentAddress.city, provinces]);

    useEffect(() => {
        // Cập nhật lại danh sách phường/xã khi quận/huyện thay đổi
        if (currentAddress.district) {
            const selectedDistrict = districts.find((district) => district.Code === currentAddress.district);
            if (selectedDistrict) {
                setWards(selectedDistrict.Ward);
            }
        }
    }, [currentAddress.district, districts]);

    const handleCityChange = (cityCode) => {
        handleAddressChange({ ...currentAddress, city: cityCode, district: "", ward: "" });
        const selectedCity = provinces.find((province) => province.Code === cityCode);
        setDistricts(selectedCity ? selectedCity.District : []);
        setWards([]);
    };

    const handleDistrictChange = (districtCode) => {
        handleAddressChange({ ...currentAddress, district: districtCode, ward: "" });
        const selectedDistrict = districts.find((district) => district.Code === districtCode);
        setWards(selectedDistrict ? selectedDistrict.Ward : []);
    };

    const handleWardChange = (wardCode) => {
        handleAddressChange({ ...currentAddress, ward: wardCode });
    };

    return (
        <div>
            {/* Thành phố */}
            <div className="mb-3">
                <label htmlFor="city" className="col-form-label">Thành phố:</label>
                <select
                    className="form-control"
                    id="city"
                    value={currentAddress.city}
                    onChange={(e) => handleCityChange(e.target.value)}
                >
                    <option value="">Chọn Thành phố</option>
                    {provinces.map((province) => (
                        <option key={province.Code} value={province.Code}>
                            {province.FullName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Quận/Huyện */}
            <div className="mb-3">
                <label htmlFor="district" className="col-form-label">Quận/Huyện:</label>
                <select
                    className="form-control"
                    id="district"
                    value={currentAddress.district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    disabled={!currentAddress.city}
                >
                    <option value="">Chọn Quận/Huyện</option>
                    {districts.map((district) => (
                        <option key={district.Code} value={district.Code}>
                            {district.FullName}
                        </option>
                    ))}
                </select>
            </div>

            {/* Phường/Xã */}
            <div className="mb-3">
                <label htmlFor="ward" className="col-form-label">Phường/Xã:</label>
                <select
                    className="form-control"
                    id="ward"
                    value={currentAddress.ward}
                    onChange={(e) => handleWardChange(e.target.value)}
                    disabled={!currentAddress.district}
                >
                    <option value="">Chọn Phường/Xã</option>
                    {wards.map((ward) => (
                        <option key={ward.Code} value={ward.Code}>
                            {ward.FullName}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default AddressForm;

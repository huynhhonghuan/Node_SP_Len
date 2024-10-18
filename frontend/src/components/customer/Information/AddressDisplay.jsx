import React from 'react';
import vietnamData from '../../../assets/vn_only_simplified_json_generated_data_vn_units.json';

const AddressDisplay = ({ cityId, districtId, wardId, street }) => {
    // Tìm tỉnh, quận, phường tương ứng
    const province = vietnamData.find(prov => prov.Code === cityId);
    const district = province?.District.find(dist => dist.Code === districtId);
    const ward = district?.Ward.find(w => w.Code === wardId);

    return (
        <div>
            <p><strong>Tỉnh/Thành phố:</strong> {province ? province.FullName : 'Chưa chọn'}</p>
            <p><strong>Quận/Huyện:</strong> {district ? district.FullName : 'Chưa chọn'}</p>
            <p><strong>Phường/Xã:</strong> {ward ? ward.FullName : 'Chưa chọn'}</p>
            <strong>Tên đường/số nhà:</strong> {street}
        </div>
    );
};

export default AddressDisplay;

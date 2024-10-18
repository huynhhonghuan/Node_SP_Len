import React, { useEffect, useState } from 'react';
import { getUserById, updateUser } from '../../../services/UserService';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import AddressForm from './Address';
import AddressDisplay from './AddressDisplay';
import CustomToastContainer from '../../Toast/ToastContainer';
import ToastAction from '../../Toast/ToastAction';

const Information = () => {

    const [user, setUser] = useState({
        name: '',
        email: '',
        phone: '',
        addresses: [],
        isActive: '',
    }); // Default value is null

    // Lưu trạng thái ban đầu của người dùng trước khi cập nhật
    const [initialUser, setInitialUser] = useState(null);

    const [currentAddress, setCurrentAddress] = useState({
        phone: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        type: 'home',
        note: ''
    });

    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (Cookies.get('token')) {
                const decodedToken = jwtDecode(Cookies.get('token'));
                const user = await getUserById(decodedToken.id);
                setUser(user);
            }
        }
        fetchData();
    }, []);

    const handleChangeValue = (e) => {
        const { id, value } = e.target;
        setUser(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleAddressChange = (updatedAddress) => {
        setCurrentAddress(updatedAddress);
    };


    const handleDeleteAddress = async (id) => {
        try {
            // Tạo bản sao của user và loại bỏ địa chỉ có id khớp
            const updatedAddresses = user.addresses.filter(address => address._id !== id);

            // Cập nhật user với danh sách địa chỉ mới
            const updatedUser = { ...user, addresses: updatedAddresses };

            // Cập nhật thông tin người dùng trên server
            const response = await updateUser(user._id, updatedUser);

            if (response) {
                // Cập nhật user trong state nếu server phản hồi thành công
                setUser(updatedUser);
                ToastAction({ action: 'delete', message: 'Xóa thành công' });
            } else {
                ToastAction({ action: 'error', message: 'Xóa địa chỉ không thành công, vui lòng thử lại.' });
            }
        }
        catch (error) {
            console.error(error);
            ToastAction({ action: 'error', message: 'Cập nhật địa chỉ không thành công, vui lòng thử lại.' });
        }
    }

    const handleUpdateUser = async () => {
        try {
            // Lưu trạng thái ban đầu của người dùng trước khi thực hiện cập nhật
            setInitialUser({ ...user });

            // Cập nhật user trên server
            const response = await updateUser(user._id, user);

            if (response) {
                ToastAction({ action: 'update', message: 'Cập nhật thông tin thành công!' });
            } else {
                // Cập nhật không thành công, khôi phục lại dữ liệu ban đầu
                setUser(initialUser);
                ToastAction({ action: 'error', message: 'Cập nhật thông tin không thành công, vui lòng thử lại.' });
            }
        }
        catch (e) {
            // Khi có lỗi, khôi phục lại dữ liệu ban đầu
            setUser(initialUser);
            console.error(e);
            ToastAction({ action: 'error', message: 'Cập nhật thông tin lỗi, vui lòng thử lại.' });
        }
    };

    const handleAddOrEditAddress = async () => {
        try {
            let updatedAddresses = [...user.addresses];

            if (isEdit) {
                // Update existing address
                updatedAddresses = updatedAddresses.map(addr =>
                    addr._id === currentAddress._id ? currentAddress : addr
                );
            } else {
                // Add new address
                updatedAddresses.push({ ...currentAddress });
            }

            const updatedUser = { ...user, addresses: updatedAddresses };
            const response = await updateUser(user._id, updatedUser);

            if (response) {
                setUser(updatedUser);
                isEdit ? ToastAction({ action: 'update', message: 'Cập nhật địa chỉ thành công!' }) : ToastAction({ action: 'create', message: 'Thêm địa chỉ thành công!' })

            } else {
                ToastAction({ action: 'error', message: 'Thêm/cập nhật địa chỉ không thành công, vui lòng thử lại.' });
            }
        } catch (error) {
            console.error(error);
            ToastAction({ action: 'error', message: 'Thêm/cập nhật địa chỉ không thành công, vui lòng thử lại.' });
        }
    };

    const openModalForAdd = () => {
        setIsEdit(false);
        setCurrentAddress({
            phone: '',
            city: '',
            district: '',
            ward: '',
            street: '',
            type: 'home',
            note: ''
        });
    };

    const openModalForEdit = (address) => {
        setIsEdit(true);
        setCurrentAddress(address);
    };

    return (
        <>
            <div className="row mx-2 gy-2">
                <div className="col-12 col-md-4">
                    <div className="card bg-secondary-subtle border-0">
                        <div className="card-body">
                            <h5 className="card-title text-center text-uppercase">Thông tin tài khoản</h5>
                            {/* Check if user is not null before rendering */}
                            {user ? (
                                <>
                                    <p className="card-text">Tên: {user.name}</p>
                                    <p className="card-text">Email: {user.email}</p>
                                    <p className="card-text">Số điện thoại: {user.phone || 'Chưa cập nhật'}</p>
                                    <hr />
                                    <div className="d-flex gy-2">
                                        <button type="button" class="btn btn-sm btn-secondary me-2" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">Sửa thông tin</button>
                                        {/* <button className='btn btn-sm btn-info text-light'>Đổi mật khẩu</button> */}
                                    </div>
                                </>
                            ) : (
                                <p>Đang tải thông tin...</p>
                            )}
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-8">
                    <div className="card bg-secondary-subtle border-0">
                        <div className="card-body">
                            <h5 className="card-title text-center text-uppercase">Địa chỉ</h5>
                            <div className="row g-2">
                                {(user && user.addresses) && user.addresses.map((item, index) => (
                                    <div key={index} className='col-6 d-inline mb-2'>
                                        <ul class="list-group">
                                            <li class="list-group-item active d-flex" aria-current="true">
                                                Địa chỉ {index + 1}
                                                <button className='btn btn-sm btn-secondary ms-auto' data-bs-toggle="modal" data-bs-target="#modalAddress" onClick={() => openModalForEdit(item)}>Sửa</button>
                                                <button className='btn btn-sm btn-danger ms-1' onClick={() => handleDeleteAddress(item._id)}>Xóa</button>
                                            </li>
                                            <li class="list-group-item">Số điện thoại: {item.phone}</li>
                                            <li class="list-group-item">
                                                <AddressDisplay
                                                    cityId={item.city}
                                                    districtId={item.district}
                                                    wardId={item.ward}
                                                    street={item.street}
                                                />
                                            </li>
                                            <li class="list-group-item">Loại: {item.type === 'home' ? 'Nhà riêng' : item.type === 'office' ? 'Văn phòng' : 'Khác'}</li>
                                            <li class="list-group-item">Ghi chú: {item.note}</li>
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <hr />
                            <button className='btn btn-sm btn-info text-light' data-bs-toggle="modal" data-bs-target="#modalAddress" onClick={openModalForAdd}>Thêm địa chỉ</button>

                            <div class="modal fade" id="modalAddress" tabindex="-1" aria-labelledby="modalAddressLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="modalAddressLabel">{isEdit ? 'Sửa địa chỉ' : 'Thêm địa chỉ'}</h1>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div className="modal-body">
                                            <form>
                                                <div className="mb-3">
                                                    <label htmlFor="phone" className="col-form-label">Số điện thoại:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        value={currentAddress.phone}
                                                        onChange={(e) => handleAddressChange({ ...currentAddress, phone: e.target.value })}
                                                    />
                                                </div>

                                                <AddressForm currentAddress={currentAddress} handleAddressChange={handleAddressChange} />

                                                <div className="mb-3">
                                                    <label htmlFor="street" className="col-form-label">Đường:</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="street"
                                                        value={currentAddress.street}
                                                        onChange={(e) => handleAddressChange({ ...currentAddress, street: e.target.value })}
                                                    />
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="type" className="col-form-label">Loại:</label>
                                                    <select
                                                        className="form-select"
                                                        id="type"
                                                        value={currentAddress.type}
                                                        onChange={(e) => handleAddressChange({ ...currentAddress, type: e.target.value })}
                                                    >
                                                        <option value="home">Nhà riêng</option>
                                                        <option value="office">Văn phòng</option>
                                                        <option value="other">Khác</option>
                                                    </select>
                                                </div>

                                                <div className="mb-3">
                                                    <label htmlFor="note" className="col-form-label">Ghi chú:</label>
                                                    <textarea
                                                        className="form-control"
                                                        id="note"
                                                        value={currentAddress.note}
                                                        onChange={(e) => handleAddressChange({ ...currentAddress, note: e.target.value })}
                                                        rows="3" // Có thể thay đổi số hàng theo yêu cầu
                                                    />
                                                </div>

                                            </form>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleAddOrEditAddress}>{isEdit ? 'Cập nhật' : 'Thêm'}</button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Sửa thông tin</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="col-form-label">Tên người dùng:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        value={user.name}
                                        onChange={handleChangeValue}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="col-form-label">Email:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="email"
                                        value={user.email}
                                        onChange={handleChangeValue}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="phone" className="col-form-label">Số điện thoại:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="phone"
                                        value={user.phone}
                                        onChange={handleChangeValue}
                                    />
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
                            <button type="button" class="btn btn-primary" data-bs-dismiss="modal" onClick={() => handleUpdateUser()}>Cập nhật</button>
                        </div>
                    </div>
                </div>
            </div>

            <CustomToastContainer />
        </>
    );
}

export default Information;

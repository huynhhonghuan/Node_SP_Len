import React from 'react';

const Information = () => {
    return (
        <div className="row mx-2 gy-2">
            <div className="col-12 col-md-4">
                <div className="card bg-secondary-subtle border-0">
                    <div className="card-body">
                        <h5 className="card-title text-center text-uppercase ">Thông tin tài khoản</h5>
                        <p className="card-text">Tên: John Doe</p>
                        <p className="card-text">Email: johndoe@example.com</p>
                        <p className="card-text">Số điện thoại: 03645779312</p>
                        <hr />
                        <div className="d-flex gy-2">
                            <button className='btn btn-sm btn-secondary me-2'>Sửa thông tin</button>
                            <button className='btn btn-sm btn-info text-light'> Đổi mật khẩu</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-8">
                <div className="card bg-secondary-subtle border-0">
                    <div className="card-body">
                        <h5 className="card-title text-center text-uppercase">Địa chỉ</h5>
                        <p className="card-text d-flex">
                            Địa chỉ 1: 123 Main St, Anytown, USA
                            <button className='btn btn-sm btn-secondary ms-auto'>Sửa</button>
                            <button className='btn btn-sm btn-danger ms-1'>Xóa</button>
                        </p>
                        <p className="card-text d-flex">
                            Địa chỉ 2: 456 Elm St, Anytown, USA
                            <button className='btn btn-sm btn-secondary ms-auto'>Sửa</button>
                            <button className='btn btn-sm btn-danger ms-1'>Xóa</button>
                        </p>
                        <hr />
                        <button className='btn btn-sm btn-info text-light'>Thêm địa chỉ</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Information;
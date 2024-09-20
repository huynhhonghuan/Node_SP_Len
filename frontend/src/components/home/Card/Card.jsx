import React from "react";

const Card = () => {
    return (
        <div className="card-main m-5">
            <div className="row">
                <div className="col-12 col-lg-8 mb-2">
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Hình</th>
                                <th scope="col">Tên sản phẩm</th>
                                <th scope="col">Giá</th>
                                <th scope="col" width='20%'>Số lượng</th>
                                <th scope="col">Thành tiền</th>
                                <th scope="col">Xóa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <img
                                        src="https://via.placeholder.com/50"
                                        alt="Product"
                                        className="img-fluid"
                                    />
                                </td>
                                <td>Product 1</td>
                                <td>100.000đ</td>
                                <td>
                                    <input
                                        type="number"
                                        className="form-control"
                                        min="1"
                                        defaultValue="1"
                                    />
                                </td>
                                <td>100.000đ</td>
                                <td>
                                    <button className="btn btn-danger"><i class="fa-regular fa-trash-can"></i></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="d-flex justify-content-evenly align-items-center mt-3">
                        <button className="btn btn-secondary">Tiếp tục mua sắp</button>
                        <button className="btn btn-warning">Cập nhật giỏ hàng</button>
                    </div>
                </div>
                <div className="col-12 col-lg-4 border border-3">
                    <h5 className="card-title text-uppercase fw-bold">Tổng giỏ hàng</h5>
                    <hr />
                    <div className="price d-flex justify-content-between">
                        <h6 className="card-subtitle mb-2 text-muted">Tạm tính: </h6>
                        <h6 className="text-warning">150.000</h6>
                    </div>
                    <div className="price d-flex justify-content-between">
                        <h6 className="card-subtitle mb-2 text-muted">Giảm: </h6>
                        <h6 className="text-success">-15.000</h6>
                    </div>
                    <div className="price d-flex flex-column justify-content-between mb-2">
                        <h6 className="card-subtitle mb-2 text-muted">Phương thức thanh toán:</h6>
                        <div className="d-flex">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Tiền mặt
                                </label>
                            </div>
                            <div class="form-check ms-3">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Chuyển khoản
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="price d-flex justify-content-between">
                        <h6 className="card-subtitle mb-2 text-muted">Phí vận chuyển: </h6>
                        <h6 className="text-info">15.000</h6>
                    </div>
                    <div className="price d-flex justify-content-between">
                        <h6 className="card-subtitle mb-2 text-muted">Tổng tiền: </h6>
                        <h6 className="">150.000</h6>
                    </div>
                    <button type="button" className="btn btn-warning w-100">Thanh toán</button>
                    <h5 className="mt-4">Phiếu giảm giá</h5>
                    <hr />
                    <div className="price d-flex justify-content-between">
                        <div className="input-group">
                            <label>Mã giảm giá</label>
                            <input type="text" className="form-control ms-3" />
                            <button type="button" className="btn btn-primary">Áp dụng</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
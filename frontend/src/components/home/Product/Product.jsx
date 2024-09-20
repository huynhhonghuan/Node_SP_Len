import React from 'react';
import './Product.css';

const Product = ({ data }) => {
    return (
        <div className="product d-flex justify-content-start align-items-start m-5">
            <div className="product-sidebar">
                <div className="product-sidebar-title mb-3">
                    <span className='text-uppercase fw-bold border-2 border-bottom pb-2'>Tìm kiếm sản phẩm</span>
                </div>
                <div className="product-sidebar-search d-flex">
                    <input type="text" placeholder="Tìm kiếm sản phẩm..." className='form-control' />
                    <button className='btn btn-warning'>Tìm</button>
                </div>
                <div className="product-sidebar-title my-3">
                    <span className='text-uppercase fw-bold border-2 border-bottom pb-2'>Danh mục sản phẩm</span>
                </div>
                <div className="product-sidebar-filter row gy-3 text-warning-emphasis">
                    <h6>Dụng cụ</h6>
                    <h6>Len thô</h6>
                    <h6>Sản phẩm</h6>
                    <h6>Combo sản phẩm</h6>
                </div>
                <div className="product-sidebar-img mt-3">
                    <img src="https://via.placeholder.com/200x300" alt="" className='rounded border border-warning' />
                </div>
            </div>
            <div className="product-content flex-grow-1 ms-5">
                <div className="d-flex justify-content-end mb-3">
                    <div className="me-3">
                        <span>Sắp xếp</span>
                        <select name="" id="" className='form-control'>
                            <option value="">Thứ tự mặc định</option>
                            <option value="">Theo giá tăng dần</option>
                            <option value="">Theo giá giảm dần</option>
                        </select>
                    </div>
                </div>
                <div class="container text-center">
                    <div class="row g-3 d-flex justify-content-center align-items-center">
                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>
                        <div class="col-6 col-lg-4 ">
                            <div className="card border-5 border-warning h-75">
                                <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." style={{ height: '200px' }} />
                                <div class="card-body d-flex flex-column justify-content-center align-items-center">
                                    <span>Dụng cụ</span>
                                    <h5 class="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                    <span class="card-text text-warning-emphasis">70.000 - 100.000đ</span>
                                    <span className='text-warning'>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                        <i class="fa-solid fa-star"></i>
                                    </span>
                                    <a href="#" class="btn btn-warning mt-2">Xem chi tiết</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Product;
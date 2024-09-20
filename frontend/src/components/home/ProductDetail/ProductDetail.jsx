import React, { useState } from 'react';
import './ProductDetail.css';

const ProductDetail = () => {

    // State to track which collapse is open
    const [openCollapse, setOpenCollapse] = useState("collapseExample");

    // Function to handle toggling
    const handleToggle = (collapseId) => {
        // If the same collapse is clicked, don't hide it
        setOpenCollapse(collapseId === openCollapse ? "" : collapseId);
    };
    return (
        <div className='product-detail my-5'>
            {/* Tương tác với API để lấy thông tin chi tiết sản phẩm */}
            <div className="product-detail-header row d-flex justify-content-evenly">
                <div className="col-12 col-md-3">
                    <div id="carouselExample" class="carousel slide">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <img src="https://via.placeholder.com/200x250" class="d-block w-100 border border-5 border-warning" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="https://via.placeholder.com/200x250" class="d-block w-100 border border-5 border-warning" alt="..." />
                            </div>
                            <div class="carousel-item">
                                <img src="https://via.placeholder.com/200x250" class="d-block w-100 border border-5 border-warning" alt="..." />
                            </div>
                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>

                    <div id="carouselExample-1" class="carousel slide mt-2">
                        <div class="carousel-inner">
                            <div class="carousel-item active">
                                <div className="row d-inline-flex">
                                    <div className="col-3">
                                        <img src="https://via.placeholder.com/75x75" class="d-block border border-5 border-warning" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src="https://via.placeholder.com/75x75" class="d-block border border-5 border-warning" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src="https://via.placeholder.com/75x75" class="d-block border border-5 border-warning" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src="https://via.placeholder.com/75x75" class="d-block border border-5 border-warning" alt="..." />
                                    </div>
                                </div>
                            </div>

                            <div class="carousel-item ">
                                <div className="row d-inline-flex">
                                    <div className="col-3">
                                        <img src="https://via.placeholder.com/75x75" class="d-block border border-5 border-warning" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src="https://via.placeholder.com/75x75" class="d-block border border-5 border-warning" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src="https://via.placeholder.com/75x75" class="d-block border border-5 border-warning" alt="..." />
                                    </div>
                                    <div className="col-3">
                                        <img src="https://via.placeholder.com/75x75" class="d-block border border-5 border-warning" alt="..." />
                                    </div>
                                </div>
                            </div>

                        </div>
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample-1" data-bs-slide="prev">
                            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExample-1" data-bs-slide="next">
                            <span class="carousel-control-next-icon" aria-hidden="true"></span>
                            <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div className="col-12 col-md-4 d-flex flex-column">
                    <h2 className=''>Hoa hướng dương</h2>
                    <hr className='border-bottom border-2 w-25' />
                    <h3>75.000 - 400.000đ</h3>
                    <h5 className='mt-3'>Tùy chọn:</h5>
                    <div class="row g-2">
                        <div class="col">
                            <img src="https://via.placeholder.com/50x50" class="d-block carouselexample-1" alt="..." />
                        </div>
                        <div class="col">
                            <img src="https://via.placeholder.com/50x50" class="d-block carouselexample-1" alt="..." />
                        </div>
                        <div class="col">
                            <img src="https://via.placeholder.com/50x50" class="d-block carouselexample-1" alt="..." />
                        </div>
                        <div class="col">
                            <img src="https://via.placeholder.com/50x50" class="d-block carouselexample-1" alt="..." />
                        </div>
                        <div class="col">
                            <img src="https://via.placeholder.com/50x50" class="d-block carouselexample-1" alt="..." />
                        </div>
                        <div class="col">
                            <img src="https://via.placeholder.com/50x50" class="d-block carouselexample-1" alt="..." />
                        </div>
                    </div>
                    <div className="row d-flex mt-5">
                        <div className="col-4">
                            <h5>Số lượng:</h5>
                        </div>
                        <div className="col-8">
                            <input type="number" min="1" max="100" className='form-control' />
                        </div>
                        <div className="col">
                            <button className='btn btn-warning mt-3 w-50'>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-2">
                    <h6>Sản phẩm yêu thích</h6>
                    <div className="row g-2">
                        <div className="col d-flex">
                            <img src="https://via.placeholder.com/100x100" class="d-block border border-5 border-warning" alt="..." />
                            <div className="ms-1">
                                <h6>Hoa hướng dương</h6>
                                <p>75.000đ</p>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <img src="https://via.placeholder.com/100x100" class="d-block border border-5 border-warning" alt="..." />
                            <div className="ms-1">
                                <h6>Hoa hướng dương</h6>
                                <p>75.000đ</p>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <img src="https://via.placeholder.com/100x100" class="d-block border border-5 border-warning" alt="..." />
                            <div className="ms-1">
                                <h6>Hoa hướng dương</h6>
                                <p>75.000đ</p>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <img src="https://via.placeholder.com/100x100" class="d-block border border-5 border-warning" alt="..." />
                            <div className="ms-1">
                                <h6>Hoa hướng dương</h6>
                                <p>75.000đ</p>
                            </div>
                        </div>
                        <div className="col d-flex">
                            <img src="https://via.placeholder.com/100x100" class="d-block border border-5 border-warning" alt="..." />
                            <div className="ms-1">
                                <h6>Hoa hướng dương</h6>
                                <p>75.000đ</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="product-detail-info mx-5">
                <p className="d-inline-flex gap-1">
                    {/* Thông tin chi tiết link */}
                    <a
                        className={`text-decoration-none text-secondary text-uppercase me-5 ${openCollapse === "collapseExample" ? "active" : ""}`}
                        onClick={() => handleToggle("collapseExample")}
                        role="button"
                        aria-expanded={openCollapse === "collapseExample"}
                    >
                        Thông tin chi tiết
                    </a>
                    {/* Đánh giá link */}
                    <a
                        className={`text-decoration-none text-secondary text-uppercase ${openCollapse === "collapseExample-1" ? "active" : ""}`}
                        onClick={() => handleToggle("collapseExample-1")}
                        role="button"
                        aria-expanded={openCollapse === "collapseExample-1"}
                    >
                        Đánh giá
                    </a>
                </p>
                {/* Thông tin chi tiết content */}
                <div className={`collapse ${openCollapse === "collapseExample" ? "show" : ""}`} id="collapseExample">
                    <div className="">
                        Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                    </div>
                </div>
                {/* Đánh giá content */}
                <div className={`collapse ${openCollapse === "collapseExample-1" ? "show" : ""}`} id="collapseExample-1">
                    <div className="">
                        Some placeholder content for the collapse component.
                    </div>
                </div>
            </div>

            <div className="home-menu-product-outstanding row gy-2 px-5">
                <h5 className='text-uppercase'>Sản phẩm tương tự</h5>
                <div id="carouselExampleAutoplaying-3" class="carousel slide " data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div className="row gy-2">
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                        <div class="carousel-item">
                            <div className="row gy-2">
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                        <div class="carousel-item">
                            <div className="row gy-2">
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                                <div className="col-6 col-md-3">
                                    <div className="card border-5 border-warning">
                                        <img src="https://via.placeholder.com/100x100" class="card-img-top" alt="..." />
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
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying-3" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying-3" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
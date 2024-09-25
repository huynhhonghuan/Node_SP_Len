import React, { useEffect, useState } from 'react';
import './Home.css';
import header_img_1 from '../../../assets/images/home/home-header-1.jpg';
import header_img_2 from '../../../assets/images/home/home-header-2.jpg';
import header_img_3 from '../../../assets/images/home/home-header-3.jpg';

import menu_1 from '../../../assets/images/home/home-header-1.jpg';
import menu_2 from '../../../assets/images/home/home-header-2.jpg';
import menu_3 from '../../../assets/images/home/home-header-3.jpg';

import user_logo from '../../../assets/images/home/user_logo.png';

import { Link } from 'react-router-dom';
import { getProductBestSeller, getProductByCommentAndUser, getProductByType, getProductNewByUpdateAt } from '../../../services/ProductService';

const Home = () => {

    const [menuProduct, setMenuProduct] = useState({ 'tool': 0, 'wool': 0, 'product': 0, 'comboproduct': 0 });
    const [groupedProductNew1, setGroupedProductNew1] = useState([]);
    const [groupedProductNew2, setGroupedProductNew2] = useState([]);

    const [bestSeller, setBestSeller] = useState([]);

    const [comment, setComment] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                let tool = await getProductByType('tool');
                let wool = await getProductByType('wool');
                let product = await getProductByType('product');
                setMenuProduct(prevState => ({
                    ...prevState,
                    'tool': tool.length,
                    'wool': wool.length,
                    'product': product.length,
                    'comboproduct': 0, // TODO: fetch combo product count here
                }));

                let newProduct = await getProductNewByUpdateAt();
                // Chia dữ liệu thành các nhóm, mỗi nhóm gồm 4 sản phẩm
                const groupedProductNew1 = [];
                const groupedProductNew2 = [];
                let number = 0;

                // Chia dữ liệu thành các nhóm, mỗi nhóm gồm 4 sản phẩm
                for (let i = 0; i < newProduct.length; i += 4) {
                    const group = newProduct.slice(number, number + 4);

                    // Nếu số nhánh của nhóm 1 nhỏ hơn 3, thêm vào nhóm 1
                    if (groupedProductNew1.length < 3) {
                        groupedProductNew1.push(group);
                    }
                    // Nếu nhóm 1 đã đủ 3 nhánh, thêm các phần tử còn lại vào nhóm 2
                    else {
                        groupedProductNew2.push(group);
                    }

                    number += 4;
                }

                // Cập nhật state
                setGroupedProductNew1(groupedProductNew1);
                setGroupedProductNew2(groupedProductNew2);

                // let bestSellerData = await getProductBestSeller();
                // setBestSeller(bestSellerData);

                let commentData = await getProductByCommentAndUser();
                setComment(commentData);

            } catch (error) {
                console.error('Error fetching product by type:', error);
            }
        };

        fetchData();
    }, []); // empty dependency array to run this effect only once

    useEffect(() => {
        console.log(menuProduct);
    }, [menuProduct]);

    return (
        <div className='home mx-5'>
            <div className="home-header">
                <div id="carouselExampleCaptions" class="carousel slide" style={{ maxHeight: '500px' }}>
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src={header_img_1} class="d-block w-50 h-75 mx-auto" alt="..." style={{ width: '50%' }} />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>First slide label</h5>
                                <p>Some representative placeholder content for the first slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src={header_img_2} class="d-block w-50 h-75 mx-auto" alt="..." style={{ width: '50%' }} />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Second slide label</h5>
                                <p>Some representative placeholder content for the second slide.</p>
                            </div>
                        </div>
                        <div class="carousel-item">
                            <img src={header_img_3} class="d-block w-50 mx-auto" alt="..." style={{ width: '50%' }} />
                            <div class="carousel-caption d-none d-md-block">
                                <h5>Third slide label</h5>
                                <p>Some representative placeholder content for the third slide.</p>
                            </div>
                        </div>
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="home-title my-5">
                <div className="row align-items-center">
                    <div className="col-4">
                        <hr className='border-2' />
                    </div>
                    <div className="col-4 text-center">
                        <i className="fa-solid fa-user-tie me-2 fs-4"></i> {/* Sử dụng me-2 để tạo khoảng cách giữa icon và tiêu đề */}
                        <h4 className="d-inline-block mb-0 text-uppercase">Tiệm nhà len</h4> {/* d-inline-block để giữ cho h3 và icon trên cùng một dòng */}
                    </div>
                    <div className="col-4">
                        <hr className='border-2' />
                    </div>
                </div>
            </div>

            <div className="row mt-4">
                <div className="col-6 col-md-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="border border-2 rounded-circle p-3 border-warning">
                        <i class="fa-solid fa-car fs-1 classname"></i>
                    </div>
                    <h5 className='mt-3 text-center'>Miễn Phí Vận Chuyển</h5>
                    <p className='text-center'>Miễn phí vận chuyển đơn hàng trên 600k</p>
                </div>
                <div className="col-6 col-md-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="border border-2 rounded-circle p-3 border-warning">
                        <i class="fa-solid fa-car fs-1 classname"></i>
                    </div>
                    <h5 className='mt-3 text-center'>Chăm Sóc Khách Hàng</h5>
                    <p className='text-center'>Hỗ trợ khách hàng 24/7.</p>
                </div>
                <div className="col-6 col-md-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="border border-2 rounded-circle p-3 border-warning">
                        <i class="fa-solid fa-car fs-1 classname"></i>
                    </div>
                    <h5 className='mt-3 text-center'>Đổi Trả Hàng</h5>
                    <p className='text-center'>Miễn phí đổi trả trong 10 ngày.</p>
                </div>
                <div className="col-6 col-md-3 d-flex flex-column justify-content-center align-items-center">
                    <div className="border border-2 rounded-circle p-3 border-warning">
                        <i class="fa-solid fa-car fs-1 classname"></i>
                    </div>
                    <h5 className='mt-3 text-center'>Giá Cả Hợp Lý</h5>
                    <p className='text-center'>Giá cả hợp lý theo nhu cầu của Khách Hàng</p>
                </div>
            </div>

            <div className="home-title my-5">
                <div className="row align-items-center">
                    <div className="col-4">
                        <hr className='border-2' />
                    </div>
                    <div className="col-4 text-center">
                        <i className="fa-solid fa-user-tie me-2 fs-4"></i> {/* Sử dụng me-2 để tạo khoảng cách giữa icon và tiêu đề */}
                        <h4 className="d-inline-block mb-0 text-uppercase">Danh Mục Sản Phẩm</h4> {/* d-inline-block để giữ cho h3 và icon trên cùng một dòng */}
                    </div>
                    <div className="col-4">
                        <hr className='border-2' />
                    </div>
                </div>
            </div>

            <div className="home-menu-product row gy-2">
                <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
                    <div className="home-menu-product-card">
                        <div className="home-menu-product-card-title">
                            <span className='bg-warning px-3 rounded-bottom fst-italic'>
                                <i className="fa-solid fa-house-chimney text-light rounded me-2"></i>
                                Tiệm Len
                            </span>
                        </div>
                        <img src={menu_1} className="card-img-top" alt="..." />
                        <Link to='product/tool' className='text-dark'>
                            <div className="card-body home-menu-product-card-body">
                                <h5 className="card-title text-uppercase fw-bold">Dụng cụ</h5>
                                <span className="card-text text-warning-emphasis">
                                    {menuProduct?.tool !== undefined ? `${menuProduct.tool} dụng cụ` : 'Đang tải...'}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
                    <div className="home-menu-product-card">
                        <div className="home-menu-product-card-title">
                            <span className='bg-warning px-3 rounded-bottom fst-italic'>
                                <i className="fa-solid fa-house-chimney text-light rounded me-2"></i>
                                Tiệm Len
                            </span>
                        </div>
                        <img src={menu_2} className="card-img-top" alt="..." />
                        <Link to='product/wool' className='text-dark'>
                            <div className="card-body home-menu-product-card-body">
                                <h5 className="card-title text-uppercase fw-bold">Len thô</h5>
                                <span className="card-text text-warning-emphasis">
                                    {menuProduct?.wool !== undefined ? `${menuProduct.wool} len thô` : 'Đang tải...'}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
                    <div className="home-menu-product-card">
                        <div className="home-menu-product-card-title">
                            <span className='bg-warning px-3 rounded-bottom fst-italic'>
                                <i className="fa-solid fa-house-chimney text-light rounded me-2"></i>
                                Tiệm Len
                            </span>
                        </div>
                        <img src={menu_3} className="card-img-top" alt="..." />
                        <Link to='product/product' className='text-dark'>
                            <div className="card-body home-menu-product-card-body">
                                <h5 className="card-title text-uppercase fw-bold">Sản phẩm</h5>
                                <span className="card-text text-warning-emphasis">
                                    {menuProduct?.product !== undefined ? `${menuProduct.product} sản phẩm` : 'Đang tải...'}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="col-12 col-sm-6 col-md-3 d-flex justify-content-center">
                    <div className="home-menu-product-card">
                        <div className="home-menu-product-card-title">
                            <span className='bg-warning px-3 rounded-bottom fst-italic'>
                                <i className="fa-solid fa-house-chimney text-light rounded me-2"></i>
                                Tiệm Len
                            </span>
                        </div>
                        <img src={menu_3} className="card-img-top" alt="..." />
                        <Link to='product/comboproduct' className='text-dark'>
                            <div className="card-body home-menu-product-card-body">
                                <h5 className="card-title text-uppercase fw-bold">Combo sản phẩm</h5>
                                <span className="card-text text-warning-emphasis">
                                    {menuProduct?.comboproduct !== undefined ? `${menuProduct.comboproduct} combo` : 'Đang tải...'}
                                </span>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="home-title my-5">
                <div className="row align-items-center">
                    <div className="col-4">
                        <hr className='border-2' />
                    </div>
                    <div className="col-4 text-center">
                        <i className="fa-solid fa-user-tie me-2 fs-4"></i> {/* Sử dụng me-2 để tạo khoảng cách giữa icon và tiêu đề */}
                        <h4 className="d-inline-block mb-0 text-uppercase">Sản phẩm nổi bật</h4> {/* d-inline-block để giữ cho h3 và icon trên cùng một dòng */}
                    </div>
                    <div className="col-4">
                        <hr className='border-2' />
                    </div>
                </div>
            </div>

            <div className="home-menu-product-outstanding row gy-2">
                <div id="carouselExampleAutoplaying" class="carousel slide px-5" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {groupedProductNew1 && (
                            groupedProductNew1.map((group, groupIndex) => (
                                <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
                                    <div className="row gy-2">
                                        {group.map((product, index) => (
                                            <div key={index} className="col-6 col-md-3">
                                                <div className="card border-5 border-warning">
                                                    <img src={product.image} className="card-img-top w-100" alt="..." style={{ height: '200px' }} />
                                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                        <span>
                                                            {product.type == 'tool' ? 'Dụng cụ' :
                                                                product.type == 'wool' ? 'Len thô' :
                                                                    product.type == 'product' ? 'Sản phẩm' : ''}
                                                        </span>
                                                        <h5 className="card-title text-uppercase fw-bold text-center">{product.name}</h5>
                                                        <span className="card-text text-warning-emphasis">{product.options[0].price}đ</span>
                                                        <span className="text-warning">
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                        </span>
                                                        <Link to={`/product-detail/${product._id}`} className='btn btn-warning mt-2'>
                                                            Xem chi tiết
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}

                        {/* <div class="carousel-item active">
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
                        </div> */}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>

                <div id="carouselExampleAutoplaying-1" class="carousel slide px-5" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {groupedProductNew2 && (
                            groupedProductNew2.map((group, groupIndex) => (
                                <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
                                    <div className="row gy-2">
                                        {group.map((product, index) => (
                                            <div key={index} className="col-6 col-md-3">
                                                <div className="card border-5 border-warning">
                                                    <img src={product.image} className="card-img-top w-100" alt="..." style={{ height: '200px' }} />
                                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                        <span className=''>
                                                            {product.type == 'tool' ? 'Dụng cụ' :
                                                                product.type == 'wool' ? 'Len thô' :
                                                                    product.type == 'product' ? 'Sản phẩm' : ''}
                                                        </span>
                                                        <h5 className="card-title text-uppercase fw-bold text-center">{product.name}</h5>
                                                        <span className="card-text text-warning-emphasis">{product.options[0].price}đ</span>
                                                        <span className="text-warning">
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                        </span>
                                                        <Link to={`/product-detail/${product._id}`} className='btn btn-warning mt-2'>
                                                            Xem chi tiết
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                        {/* <div class="carousel-item active">
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
                        </div> */}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying-1" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Previous</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying-1" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Next</span>
                    </button>
                </div>
            </div>


            <div className="home-title my-5">
                <div className="row align-items-center">
                    <div className="col-4">
                        <hr className='border-2' />
                    </div>
                    <div className="col-4 text-center">
                        <i className="fa-solid fa-user-tie me-2 fs-4"></i> {/* Sử dụng me-2 để tạo khoảng cách giữa icon và tiêu đề */}
                        <h4 className="d-inline-block mb-0 text-uppercase">Sản phẩm bán chạy</h4> {/* d-inline-block để giữ cho h3 và icon trên cùng một dòng */}
                    </div>
                    <div className="col-4">
                        <hr className='border-2' />
                    </div>
                </div>
            </div>
            <div className="home-menu-product-outstanding row gy-2">
                <div id="carouselExampleAutoplaying-3" class="carousel slide px-5" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {bestSeller && (
                            bestSeller.map((group, groupIndex) => (
                                <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
                                    <div className="row gy-2">
                                        {group.map((product, index) => (
                                            <div key={index} className="col-6 col-md-3">
                                                <div className="card border-5 border-warning">
                                                    <img src={product.image} className="card-img-top w-100" alt="..." style={{ height: '200px' }} />
                                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                                        <span className=''>
                                                            {product.type == 'tool' ? 'Dụng cụ' :
                                                                product.type == 'wool' ? 'Len thô' :
                                                                    product.type == 'product' ? 'Sản phẩm' : ''}
                                                        </span>
                                                        <h5 className="card-title text-uppercase fw-bold text-center">{product.name}</h5>
                                                        <span className="card-text text-warning-emphasis">{product.options[0].price}đ</span>
                                                        <span className="text-warning">
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                        </span>
                                                        <Link to={`/product-detail/${product._id}`} className='btn btn-warning mt-2'>
                                                            Xem chi tiết
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))
                        )}
                        {/* <div class="carousel-item active">
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
                        </div> */}
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

            <div className="home-title my-5">
                <div className="row align-items-center">
                    <div className="col-3">
                        <hr className='border-2' />
                    </div>
                    <div className="col-6 text-center">
                        <i className="fa-solid fa-user-tie me-2 fs-4"></i> {/* Sử dụng me-2 để tạo khoảng cách giữa icon và tiêu đề */}
                        <h4 className="d-inline-block mb-0 text-uppercase">Ưu đãi - Mã giảm giá</h4> {/* d-inline-block để giữ cho h3 và icon trên cùng một dòng */}
                    </div>
                    <div className="col-3">
                        <hr className='border-2' />
                    </div>
                </div>
            </div>
            <div className="home-discount row gy-2">
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <img src={menu_1} alt="logo" className='border border-5 rounded border-warning' style={{ width: '50%' }} />
                </div>
                <div className="col-12 col-md-6 d-flex flex-column justify-content-center align-items-center">
                    <div className="">
                        <h1 className='border border-5 rounded border-warning text-success px-5'>HADKN2024</h1>
                        <p>Áp dụng cho đơn hàng từ: 300.000</p>
                        <p>Thời gian từ: 16/9/2024 - 30/9/2024</p>
                        <p>Giảm giá: 20%</p>
                    </div>
                </div>
            </div>

            <div className="home-title my-5">
                <div className="row align-items-center">
                    <div className="col-3">
                        <hr className='border-2' />
                    </div>
                    <div className="col-6 text-center">
                        <i className="fa-solid fa-user-tie me-2 fs-4"></i> {/* Sử dụng me-2 để tạo khoảng cách giữa icon và tiêu đề */}
                        <h4 className="d-inline-block mb-0 text-uppercase">ý kiến đánh giá của khách hàng</h4> {/* d-inline-block để giữ cho h3 và icon trên cùng một dòng */}
                    </div>
                    <div className="col-3">
                        <hr className='border-2' />
                    </div>
                </div>
            </div>

            <div className="home-comment my-5">
                <div className="row gy-2">
                    {comment && (
                        comment.map((item, index) => (
                            <div className="col-12 col-sm-6 col-md-4">
                                <div className="d-flex flex-column justify-content-center align-items-center">
                                    <img src={user_logo} alt="user" className="rounded-circle" style={{ width: '100px' }} />
                                    <h5 className="text-uppercase fw-bold mt-2">{item.userDetails.name}</h5>
                                    <p className="">{item.comments.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                    {/* <div className="col-12 col-sm-6 col-md-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img src="https://via.placeholder.com/100x100" alt="user" className="rounded-circle" />
                            <h5 className="text-uppercase fw-bold mt-2">User 1</h5>
                            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lectus vel velit tempus dignissim. Nullam nec turpis quis nisi dapibus dictum. Donec vel ligula a felis tempor ultricies.</p>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img src="https://via.placeholder.com/100x100" alt="user" className="rounded-circle" />
                            <h5 className="text-uppercase fw-bold mt-2">User 1</h5>
                            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lectus vel velit tempus dignissim. Nullam nec turpis quis nisi dapibus dictum. Donec vel ligula a felis tempor ultricies.</p>
                        </div>
                    </div>

                    <div className="col-12 col-sm-6 col-md-4">
                        <div className="d-flex flex-column justify-content-center align-items-center">
                            <img src="https://via.placeholder.com/100x100" alt="user" className="rounded-circle" />
                            <h5 className="text-uppercase fw-bold mt-2">User 1</h5>
                            <p className="">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel lectus vel velit tempus dignissim. Nullam nec turpis quis nisi dapibus dictum. Donec vel ligula a felis tempor ultricies.</p>
                        </div>
                    </div> */}

                </div>
            </div>

        </div>
    )
}

export default Home;
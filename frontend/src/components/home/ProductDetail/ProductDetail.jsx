import React, { useEffect, useState } from 'react';
import './ProductDetail.css';
import { Link, useParams } from 'react-router-dom';
import { getProductById, getProductByType } from '../../../services/ProductService';
import { format } from 'date-fns';  // Thêm import này

import user_logo from '../../../assets/images/home/user_logo.png';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [groupedProductNew1, setGroupedProductNew1] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (id) {
                    const response = await getProductById(id);
                    setProduct(response);

                    // Get similar products
                    const newProduct = await getProductByType(response.type);

                    // Chia dữ liệu thành các nhóm, mỗi nhóm gồm 4 sản phẩm
                    const groupedProduct = [];
                    for (let i = 0; i < newProduct.length; i += 4) {
                        const group = newProduct.slice(i, i + 4);
                        groupedProduct.push(group);

                        if (i >= 12) break; // Dừng lại sau khi lấy 12 sản phẩm
                    }

                    setGroupedProductNew1(groupedProduct);
                    console.log(groupedProduct); // Log để kiểm tra giá trị nhóm sản phẩm
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false); // Ẩn loader sau khi hoàn tất fetch
            }
        };

        fetchData();
    }, [id]);

    const [openCollapse, setOpenCollapse] = useState("collapseExample");

    const handleToggle = (collapseId) => {
        setOpenCollapse(collapseId === openCollapse ? "" : collapseId);
    };

    // Get the highest and lowest price from product options
    const getPriceRange = (options) => {
        if (options && options.length > 0) {
            const prices = options.map(option => option.price);
            const highestPrice = Math.max(...prices);
            const lowestPrice = Math.min(...prices);
            return { highestPrice, lowestPrice };
        }
        return { highestPrice: null, lowestPrice: null };
    };

    // Get price range from product options if product exists
    const priceRange = product ? getPriceRange(product.options) : {};

    const [selectedOption, setSelectedOption] = useState(product?.options[0] || null); // Giả sử mặc định là tùy chọn đầu tiên

    // Handle option click and update selected option
    const handleOptionClick = (option) => {
        setSelectedOption(option); // Update selected option
    };

    const [currentIndex, setCurrentIndex] = useState(0); // State to track current carousel index

    const handleCarouselChange = (index) => {
        setCurrentIndex(index); // Update current index when the carousel changes
    };

    const handleThumbnailClick = (index) => {
        setCurrentIndex(index); // Update current index when a thumbnail is clicked
        // Scroll to the corresponding item in the main carousel
        const carousel = document.querySelector('#carouselExample');
        const carouselInstance = new bootstrap.Carousel(carousel);
        carouselInstance.to(index); // Go to the clicked thumbnail index
    };

    const [quantity, setQuantity] = useState(1);

    const handleAddToCart = () => {
        if (!selectedOption) {
            alert('Hãy chọn tùy chọn sản phẩm!');
            return;
        }; // Không thêm nếu không có tùy chọn nào được chọn

        // Lấy giỏ hàng từ localStorage
        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        // Tạo sản phẩm để thêm vào giỏ hàng
        const newItem = {
            _id: product._id, // hoặc product._id tùy thuộc vào cấu trúc sản phẩm của bạn
            name: product.name,
            option: selectedOption,
            quantity: quantity,
            price: selectedOption.price * quantity, // Tính tổng giá
            checked: true,
        };

        // Kiểm tra nếu sản phẩm đã tồn tại trong giỏ hàng
        const existingItemIndex = cart.findIndex(item => item._id === newItem._id && item.option._id === newItem.option._id);
        if (existingItemIndex >= 0) {
            // Cập nhật số lượng nếu sản phẩm đã tồn tại
            cart[existingItemIndex].quantity += quantity;
            cart[existingItemIndex].price += newItem.price; // Cập nhật tổng giá
        } else {
            // Thêm sản phẩm mới vào giỏ hàng
            cart.push(newItem);
        }

        // Lưu giỏ hàng trở lại localStorage
        localStorage.setItem('cart', JSON.stringify(cart));

        // Có thể thông báo cho người dùng rằng sản phẩm đã được thêm thành công
        alert('Sản phẩm đã được thêm vào giỏ hàng!');
    };

    if (loading) {
        return <div>Loading...</div>; // Show loading spinner or message while fetching data
    }

    if (!product) {
        return <div>No product found.</div>; // Show message if no product is found
    }

    return (
        <div className='product-detail my-5'>
            {/* Tương tác với API để lấy thông tin chi tiết sản phẩm */}
            <div className="product-detail-header row d-flex justify-content-evenly">
                <div className="col-12 col-md-3">
                    {/* Main Carousel */}
                    <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
                        <div className="carousel-inner">
                            {product.options.map((option, index) => (
                                <div className={`carousel-item ${index === currentIndex ? 'active' : ''}`} key={option.image}>
                                    <img src={`${import.meta.env.VITE_API_URL}/${option.image}`} className="d-block border border-5 border-warning" alt="Product" style={{ width: '350px', height: '400px', cursor: 'pointer' }} />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" onClick={() => handleCarouselChange((currentIndex - 1 + product.options.length) % product.options.length)}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" onClick={() => handleCarouselChange((currentIndex + 1) % product.options.length)}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>

                    {/* Thumbnails Carousel */}
                    <div id="thumbnailCarousel" className="carousel slide mt-2">
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="row d-inline-flex">
                                    {product.options.map((thumb, index) => (
                                        <div className="col-3 me-3" key={index} onClick={() => handleThumbnailClick(index)}>
                                            <img src={`${import.meta.env.VITE_API_URL}/${thumb.image}`} className="d-block border border-1 border-warning" alt="Thumbnail" style={{ width: '80px', height: '80px', cursor: 'pointer' }} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#thumbnailCarousel" data-bs-slide="prev" onClick={() => handleCarouselChange((currentIndex - 1 + product.options.length) % product.options.length)}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#thumbnailCarousel" data-bs-slide="next" onClick={() => handleCarouselChange((currentIndex + 1) % product.options.length)}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <div className="col-12 col-md-4 d-flex flex-column">
                    <h2>{product.name}</h2>
                    <hr className='border-bottom border-2 w-25' />

                    <h3>
                        {selectedOption
                            ? `${selectedOption.price}đ` // Hiển thị giá của tùy chọn đã chọn
                            : priceRange.lowestPrice !== null && priceRange.highestPrice !== null
                                ? `${priceRange.lowestPrice} - ${priceRange.highestPrice}đ` // Hiển thị dải giá nếu chưa chọn tùy chọn nào
                                : 'Giá không có sẵn'}
                    </h3>

                    <h5 className='mt-3'>Tùy chọn:</h5>
                    <div className="row g-2">
                        {product?.options?.map((option, index) => (
                            <div className="col" key={index} onClick={() => handleOptionClick(option)}>
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/${option.image}`}
                                    className="d-block"
                                    alt="Option"
                                    style={{ width: '80px', height: '80px', cursor: 'pointer', border: selectedOption === option ? '2px solid orange' : 'none' }}
                                />
                            </div>
                        ))}
                    </div>

                    <div className="row d-flex mt-5">
                        <div className="col-4">
                            <h5>Số lượng:</h5>
                        </div>
                        <div className="col-8">
                            <input
                                type="number"
                                min="1"
                                max="100"
                                className='form-control'
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                            />
                        </div>
                        <div className="col text-center">
                            <button className='btn btn-warning mt-3 w-50' onClick={handleAddToCart}>Thêm vào giỏ hàng</button>
                        </div>
                    </div>
                </div>
                {/* <div className="col-12 col-md-2">
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
                </div> */}
            </div>

            <div className="product-detail-info mx-5 mt-5">
                <p className="d-inline-flex gap-1">
                    {/* Thông tin chi tiết link */}
                    <a
                        className={`text-decoration-none text-secondary text-uppercase me-5 border-bottom ${openCollapse === "collapseExample" ? "active" : ""}`}
                        onClick={() => handleToggle("collapseExample")}
                        role="button"
                        aria-expanded={openCollapse === "collapseExample"}
                    >
                        Thông tin chi tiết
                    </a>
                    {/* Đánh giá link */}
                    <a
                        className={`text-decoration-none text-secondary text-uppercase border-bottom ${openCollapse === "collapseExample-1" ? "active" : ""}`}
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
                        <h5>Tên sản phẩm</h5>
                        <p>{product.name}</p>
                    </div>
                    <div className="">
                        <h5>Mô tả</h5>
                        <p>{product.description}</p>
                    </div>
                    <div className="">
                        <h5>Loại sản phẩm</h5>
                        <p>{product.type === 'product' ? 'Sản phẩm' : product.type === 'tool' ? 'Dụng cụ' : product.type === 'wool' ? 'Len thô' : ''}</p>
                    </div>
                    <div className="">
                        <h5>Các loại lựa chọn</h5>
                        <div className='row'>{product.options.map((item, index) => (
                            <div className="col-12 col-sm-3">
                                <img
                                    src={`${import.meta.env.VITE_API_URL}/${item.image}`}
                                    className=""
                                    alt="Option"
                                    style={{ width: '250px', height: '300px', cursor: 'pointer', border: '2px solid orange' }}
                                />
                            </div>
                        ))}
                        </div>
                        <p className='mt-3'>Giá cả: {priceRange.lowestPrice !== null && priceRange.highestPrice !== null
                            ? `${priceRange.lowestPrice} - ${priceRange.highestPrice}đ` // Hiển thị dải giá nếu chưa chọn tùy chọn nào
                            : 'Giá không có sẵn'}</p>
                    </div>
                    <div className="">
                        <h5>Ghi chú</h5>
                        <p>{product.note}</p>
                    </div>
                </div>
                {/* Đánh giá content */}
                <div className={`collapse ${openCollapse === "collapseExample-1" ? "show" : ""}`} id="collapseExample-1">
                    <div className="row my-3">
                        {product.comments.map((comment, index) => (
                            <div className="col-12 my-2">
                                <div className="d-flex justify-content-start align-items-center">
                                    <img src={user_logo} alt="user" className="rounded-circle me-3" style={{ width: '80px' }} />
                                    {/* <h5 className="text-uppercase fw-bold mt-2">{item.name}</h5> */}
                                    <p className="">
                                        {comment.content}
                                        <br />
                                        {format(new Date(comment.createdAt), 'dd-MM-yyyy HH:mm:ss')}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="home-menu-product-outstanding row gy-2 px-5 mt-5">
                <h5 className='text-uppercase'>Sản phẩm tương tự</h5>
                <div id="carouselExampleAutoplaying-3" class="carousel slide " data-bs-ride="carousel">
                    <div class="carousel-inner">
                        {groupedProductNew1 && (
                            groupedProductNew1.map((group, groupIndex) => (
                                <div key={groupIndex} className={`carousel-item ${groupIndex === 0 ? 'active' : ''}`}>
                                    <div className="row gy-2">
                                        {group.map((product, index) => (
                                            <div key={index} className="col-6 col-md-3">
                                                <div className="card border-5 border-warning">
                                                    <img src={`${import.meta.env.VITE_API_URL}/${product.image}`} className="card-img-top w-100" alt="..." style={{ height: '200px' }} />
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
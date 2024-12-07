import React, { useEffect, useState } from 'react';
import './Product.css';
import { Link } from 'react-router-dom';
import { getAllProductsHome, getProductByType } from '../../../services/ProductService';

const Product = ({ type }) => {
    const [productList, setProductList] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 9;

    const [sortOption, setSortOption] = useState('default');
    const handleSort = (option) => {
        setSortOption(option);

        let sortedProducts = [...filteredProducts]; // Tạo bản sao danh sách sản phẩm để không thay đổi trực tiếp state

        if (option === 'price-asc') {
            sortedProducts.sort((a, b) => a.options[0].price - b.options[0].price); // Sắp xếp theo giá tăng dần
        } else if (option === 'price-desc') {
            sortedProducts.sort((a, b) => b.options[0].price - a.options[0].price); // Sắp xếp theo giá giảm dần
        } else {
            // Thứ tự mặc định (không sắp xếp)
            sortedProducts = productList;
        }

        setFilteredProducts(sortedProducts); // Cập nhật danh sách sản phẩm đã được sắp xếp
    };

    const fetchData = async () => {
        let response = '';
        if (type === 'all') {
            response = await getAllProductsHome();
        }
        else {
            response = await getProductByType(type);
        }

        if (Array.isArray(response)) {
            setProductList(response);
            setFilteredProducts(response);
        }
    };

    useEffect(() => {
        fetchData();
    }, [type]);

    useEffect(() => {
        const debounceSearch = setTimeout(() => {
            let updatedProducts = [...productList];

            if (searchTerm.trim() !== '') {
                updatedProducts = updatedProducts.filter((product) =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
            }

            // Apply sorting
            if (sortOption === 'price-asc') {
                updatedProducts.sort((a, b) => a.options[0].price - b.options[0].price);
            } else if (sortOption === 'price-desc') {
                updatedProducts.sort((a, b) => b.options[0].price - a.options[0].price);
            }

            setFilteredProducts(updatedProducts);
        }, 300);

        return () => clearTimeout(debounceSearch);
    }, [searchTerm, productList, sortOption]);


    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="product d-flex justify-content-start align-items-start m-5">
            {/* Sidebar */}
            <div className="product-sidebar">
                <div className="product-sidebar-title mb-3">
                    <span className='text-uppercase fw-bold border-2 border-bottom pb-2'>Tìm kiếm sản phẩm</span>
                </div>
                <div className="product-sidebar-search d-flex">
                    <input
                        type="text"
                        placeholder="Tìm kiếm sản phẩm..."
                        className='form-control'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Set search term on input change
                    />
                </div>
                <div className="product-sidebar-title my-3">
                    <span className='text-uppercase fw-bold border-2 border-bottom pb-2'>Danh mục sản phẩm</span>
                </div>
                <div className="product-sidebar-filter row gy-3 text-warning-emphasis">
                    <Link to="/product/tool" className="dropdown-item-main text-secondary py-3">
                        Dụng cụ
                    </Link>
                    <Link to="/product/wool" className="dropdown-item-main text-secondary py-3">
                        Len thô
                    </Link>
                    <Link to="/product/product" className="dropdown-item-main text-secondary py-3">
                        Sản phẩm
                    </Link>
                    {/* <Link to="/product/comboproduct" className="dropdown-item-main text-secondary py-3">
                        Combo sản phẩm
                    </Link> */}
                </div>
                {/* <div className="product-sidebar-img mt-3">
                    <img src="https://via.placeholder.com/200x300" alt="" className='rounded border border-warning' />
                </div> */}
            </div>

            {/* Product Content */}
            <div className="product-content flex-grow-1 ms-5">
                <div className="d-flex justify-content-end mb-3">
                    <div className="me-3">
                        <span>Sắp xếp</span>
                        <select
                            className='form-control'
                            value={sortOption}
                            onChange={(e) => handleSort(e.target.value)} // Gọi hàm handleSort khi thay đổi lựa chọn
                        >
                            <option value="default">Thứ tự mặc định</option>
                            <option value="price-asc">Theo giá tăng dần</option>
                            <option value="price-desc">Theo giá giảm dần</option>
                        </select>
                    </div>
                </div>

                <div className="container text-center">
                    <div className="row g-3 d-flex justify-content-center align-items-center">
                        {currentItems.map((item, index) => (
                            <div className="col-6 col-lg-4" key={index}>
                                <div className="card border-5 border-warning h-75">
                                    <img src={`${import.meta.env.VITE_API_URL}/${item.image}` || "https://via.placeholder.com/100x100"} className="card-img-top" alt={item.name} style={{ height: '200px' }} />
                                    <div className="card-body d-flex flex-column justify-content-center align-items-center">
                                        <span>{item.category}</span>
                                        <h5 className="card-title text-uppercase fw-bold">{item.name}</h5>
                                        <span className="card-text text-warning-emphasis">{item.options[0].price}</span>
                                        {/* <span className='text-warning'>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                            <i className="fa-solid fa-star"></i>
                                        </span> */}
                                        <Link to={`/product-detail/${item._id}`} className='btn btn-warning mt-2'>
                                            Xem chi tiết
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <div className="pagination mt-3">
                        {[...Array(totalPages).keys()].map(pageNumber => (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber + 1)}
                                className={`btn ${pageNumber + 1 === currentPage ? 'btn-primary' : 'btn-secondary'} mx-1`}>
                                {pageNumber + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Product;

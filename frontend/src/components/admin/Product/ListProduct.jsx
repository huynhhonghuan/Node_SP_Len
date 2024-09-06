import React, { useState, useEffect } from 'react';
import { Modal, Button, Table, Form, InputGroup, Pagination } from 'react-bootstrap';
import { getAllProducts } from '../../../services/ProductService'; // Cập nhật đường dẫn nếu cần
import './ListProduct.css';

function ProductPage() {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(10); // Số lượng sản phẩm trên mỗi trang
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getAllProducts();
                setData(result.data);
                setFilteredData(result.data);
            } catch (error) {
                setError(error.message || 'An error occurred');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        // Tìm kiếm
        const results = data.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredData(results);
        setCurrentPage(1); // Reset trang hiện tại khi tìm kiếm
    }, [searchTerm, data]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(parseInt(e.target.value, 10));
        setCurrentPage(1); // Reset trang hiện tại khi thay đổi số lượng hiển thị
    };

    const handleShowDeleteModal = (product) => {
        setSelectedProduct(product);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedProduct(null);
    };

    const handleDeleteProduct = async () => {
        if (selectedProduct) {
            // Thực hiện xóa sản phẩm
            // await deleteProduct(selectedProduct._id);
            // Sau khi xóa, cập nhật danh sách sản phẩm
            setData(data.filter(product => product._id !== selectedProduct._id));
            setFilteredData(filteredData.filter(product => product._id !== selectedProduct._id));
            handleCloseDeleteModal();
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    return (
        <div className="container-fluid mt-4">
            <div className="row d-flex justify-content-between align-items-end mb-3">
                {/* Title */}
                <div className="col-6">
                    <h3 className="text-light">Quản lý sản phẩm</h3>
                </div>

                {/* Search, Items Per Page, and Add Button */}
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <Button variant="success" >Thêm sản phẩm</Button>
                </div>
            </div>
            <div className="row d-flex justify-content-between align-items-end">
                <div className="col-6">
                    <Form.Group className="mb-3 w-25">
                        <Form.Label>Hiển thị</Form.Label>
                        <Form.Control
                            as="select"
                            value={itemsPerPage}
                            onChange={handleItemsPerPageChange}
                        >
                            {[10, 25, 50].map(count => (
                                <option key={count} value={count}>{count} đối tượng</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className="col-6 w-25">
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm sản phẩm..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                </div>
            </div>
            <div className="my-custom-table">
                <table className="">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên</th>
                            <th>Mô tả</th>
                            <th>Hình ảnh</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((product, index) => (
                            <tr key={product._id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>{product.description}</td>
                                <td>
                                    <img src={product.image} alt={'image'} style={{ width: '100px' }} />
                                </td>
                                <td>
                                    <Button variant="primary" className="me-2">Sửa</Button>
                                    <Button variant="danger" onClick={() => handleShowDeleteModal(product)}>Xóa</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="d-flex justify-content-center align-items-center mt-3">
                <Pagination>
                    {[...Array(Math.ceil(filteredData.length / itemsPerPage))].map((_, index) => (
                        <Pagination.Item
                            key={index}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                </Pagination>
            </div>

            {/* Modal Xóa */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sản phẩm</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa sản phẩm {selectedProduct?.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDeleteProduct}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ProductPage;

import React, { useState, useEffect } from 'react';
import { Modal, Button, InputGroup, Pagination, Form } from 'react-bootstrap';
import './List.css';
import { Link } from 'react-router-dom';

function List({ title, headers, datas, onCreate, onUpdate, onDelete }) {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5); // Số lượng mục trên mỗi trang
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        // Giả lập việc lấy dữ liệu
        setData(datas);
        setFilteredData(datas);
        setLoading(false);
    }, [datas]);

    useEffect(() => {
        // Tìm kiếm
        const results = data.filter(item =>
            Object.values(item).some(value =>
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
            )
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

    const handleShowDeleteModal = (item) => {
        setSelectedItem(item);
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setSelectedItem(null);
    };

    const handleDeleteItem = async () => {
        if (selectedItem) {
            onDelete(selectedItem);
            setData(data.filter(item => item._id !== selectedItem._id));
            setFilteredData(filteredData.filter(item => item._id !== selectedItem._id));
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
                    <h3 className="text-light">Quản lý {title}</h3>
                </div>

                {/* Search and Add Button */}
                <div className="col-6 d-flex justify-content-end align-items-center">
                    <Button variant="success" onClick={onCreate}>
                        Thêm mới
                    </Button>
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
                            {[5, 10, 25, 50].map(count => (
                                <option key={count} value={count}>{count} đối tượng</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                </div>
                <div className="col-6 w-25">
                    <InputGroup className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Tìm kiếm..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </InputGroup>
                </div>
            </div>
            <div className="my-custom-table">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            {headers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData.map((item, index) => (
                            <tr key={item._id}>
                                <td>{startIndex + index + 1}</td>
                                {Object.keys(item).map((key) =>
                                    key !== '_id' ? (
                                        <td key={key}>{item[key]}</td>  // Sử dụng key dựa trên tên trường
                                    ) : null
                                )}
                                <td>
                                    <Button variant="primary" className="me-2" onClick={() => onUpdate(item)}>Sửa</Button>
                                    <Button variant="danger" onClick={() => handleShowDeleteModal(item)}>Xóa</Button>
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
                    <Modal.Title>Xóa đối tượng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Bạn có chắc chắn muốn xóa đối tượng {selectedItem?.name}?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDeleteItem}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default List;
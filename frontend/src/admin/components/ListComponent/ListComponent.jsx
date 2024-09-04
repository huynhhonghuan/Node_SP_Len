import React, { useState, useMemo } from 'react';
import './ListComponent.css';

const ListComponent = ({ data, listName, onEdit, onDelete }) => {
    const [search, setSearch] = useState('');
    const [pageSize, setPageSize] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    // Lọc dữ liệu dựa trên từ khóa tìm kiếm
    const filteredData = useMemo(() => {
        return data.filter(item =>
            item.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [data, search]);

    // Pagination
    const pageCount = Math.ceil(filteredData.length / pageSize);
    const pageData = useMemo(() => {
        const start = currentPage * pageSize;
        const end = start + pageSize;
        return filteredData.slice(start, end);
    }, [filteredData, currentPage, pageSize]);

    const handlePageSizeChange = (e) => {
        setPageSize(Number(e.target.value));
        setCurrentPage(0); // Reset về trang đầu tiên khi thay đổi kích thước trang
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 0 && newPage < pageCount) {
            setCurrentPage(newPage);
        }
    };

    const handleGotoPage = (e) => {
        const page = Number(e.target.value) - 1;
        if (page >= 0 && page < pageCount) {
            setCurrentPage(page);
        }
    };

    const handleDeleteClick = (item) => {
        setSelectedItem(item);
        setShowModal(true);
    };

    const confirmDelete = () => {
        onDelete(selectedItem.id);
        setShowModal(false);
    };

    const headers = ['STT', ...Object.keys(data[0] || {}).filter(key => key !== 'id').map(key => key.charAt(0).toUpperCase() + key.slice(1)), 'Hành động'];

    const headers_item = Object.keys(data[0] || {}).filter(key => key !== 'id');

    return (
        <div className="container">
            <h1 className="table-title">{listName}</h1>
            <div className="table-top">
                <div className="selected">
                    <label htmlFor="page-size" className="text-color">Số lượng hiển thị:</label>
                    <select
                        id="page-size"
                        className="page-size"
                        value={pageSize}
                        onChange={handlePageSizeChange}
                    >
                        {[10, 20, 30, 40, 50].map(size => (
                            <option key={size} value={size}>
                                {size}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="search-container">
                    <label htmlFor="search" className="text-color">Tìm kiếm:</label>
                    <input
                        id="search"
                        type="text"
                        placeholder="Nhập thông tin...."
                        className="search-input"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        {headers.map((header, index) => (
                            <th key={index}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            {headers_item.map((header, i) => (
                                <td key={i}>{item[header]}</td>
                            ))}
                            <td className="actions-cell">
                                <button className='edit-button' onClick={() => { onEdit(item.id) }}>Sửa</button>
                                <button className='delete-button' onClick={() => handleDeleteClick(item)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(0)}
                    disabled={currentPage === 0}
                >
                    {"<<<"}
                </button>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 0}
                >
                    {"<"}
                </button>
                <span id="page-info" className="text-color">
                    Trang {currentPage + 1} của {pageCount}
                </span>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= pageCount - 1}
                >
                    {">"}
                </button>
                <button
                    className="pagination-button"
                    onClick={() => handlePageChange(pageCount - 1)}
                    disabled={currentPage >= pageCount - 1}
                >
                    {">>>"}
                </button>
                <label htmlFor="" className="text-color">Đi tới trang:</label>
                <input
                    type="number"
                    id="goto-page"
                    className="goto-page-input"
                    min="1"
                    max={pageCount}
                    onChange={handleGotoPage}
                />
            </div>

            {showModal && (
                <div className={`modal-overlay ${showModal ? 'show' : ''}`}>
                    <div className="modal">
                        <h2>Xác nhận</h2>
                        <p>Bạn có chắc chắn muốn xóa mục này?</p>
                        <button onClick={confirmDelete}>Xóa</button>
                        <button onClick={() => setShowModal(false)}>Hủy</button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default ListComponent;

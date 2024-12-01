import React, { useEffect, useState } from 'react';
import { getAccountStatistics, getCountStatistics, getOrderStatistics, getProductStatistics, getRevenueOrderStatistics } from '../../../services/ChartService';
import { Pie, Bar, Line } from 'react-chartjs-2';
import { saveAs } from 'file-saver'; // Thêm thư viện này nếu cần
import ExcelJS from 'exceljs';

import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    BarElement,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement);

const HomeAdmin = () => {
    const [countStatistics, setCountStatistics] = useState(
        {
            totalUsers: 0,
            totalProducts: 0,
            totalOrders: 0,
        }
    );

    const [statisticsData, setStatisticsData] = useState(null);
    const [statType, setStatType] = useState('orders');

    // Lấy ngày theo định dạng YYYY-MM-DD, có thể trừ đi số ngày tùy ý
    const getFormattedDate = (offset = 0) => {
        const today = new Date();
        today.setDate(today.getDate() + offset); // offset = -1 để trừ 1 ngày
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    // Khởi tạo state với ngày hiện tại và ngày bắt đầu trừ đi 1
    const [startDate, setStartDate] = useState(getFormattedDate(-1)); // Ngày bắt đầu là hôm qua
    const [endDate, setEndDate] = useState(getFormattedDate()); // Ngày kết thúc là hôm nay


    useEffect(() => {
        // Lấy số lượng user, product, order
        fetchData();
        // Mặc định hiển thị thống kê đơn hàng
        handleFetchStatistics();
    }, []);

    const fetchData = async () => {
        try {
            const response = await getCountStatistics();
            setCountStatistics(response);
        } catch (error) {
            console.error('Error fetching count statistics:', error);
        }
    }

    const handleFetchStatistics = async () => {
        try {
            let response;
            switch (statType) {
                // case 'accounts':
                //     response = await getAccountStatistics({ startDate, endDate });
                //     break;
                // case 'products':
                //     response = await getProductStatistics({ startDate, endDate });
                //     break;
                case 'orders':
                    response = await getOrderStatistics({ startDate, endDate });
                    break;
                case 'revenues':
                    response = await getRevenueOrderStatistics({ startDate, endDate });
                    break;
                default:
                    response = null;
            }
            setStatisticsData(response);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    const orderData = {
        labels: Array.isArray(statisticsData?.dataStatistical)
            ? statisticsData?.dataStatistical.map(item => Object.keys(item)[0])
            : [],  // Extract dates if it's an array
        datasets: [
            {
                label: 'Số lượng đơn hàng',
                data: Array.isArray(statisticsData?.dataStatistical)
                    ? statisticsData?.dataStatistical.map(item => Object.values(item)[0])
                    : [],  // Extract order values if it's an array
                fill: false,
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
            },
        ],
    };

    const revenueData = {
        labels: Array.isArray(statisticsData?.dataStatistical)
            ? statisticsData?.dataStatistical.map(item => Object.keys(item)[0]) // Lấy ngày
            : [],
        datasets: [
            {
                label: 'Doanh thu (VND)',
                data: Array.isArray(statisticsData?.dataStatistical)
                    ? statisticsData?.dataStatistical.map(item => Object.values(item)[0]) // Lấy doanh thu
                    : [],
                backgroundColor: 'rgba(30, 144, 255, 0.8)', // Màu nền xanh biển sáng
                borderColor: 'rgba(0, 191, 255, 1)', // Màu viền xanh sáng
                borderWidth: 1, // Độ dày viền
                // barThickness: 30, // Độ dày cột
            },
        ],
    };

    // Hàm chuyển đổi dữ liệu thành CSV
    // const convertToCSV = (data) => {
    //     if (!data) return '';
    //     const keys = Object.keys(data[0]);
    //     const csvRows = [keys.join(',')]; // Header của CSV

    //     data.forEach(row => {
    //         const values = keys.map(key => row[key] || ''); // Giá trị trong từng hàng
    //         csvRows.push(values.join(','));
    //     });

    //     return csvRows.join('\n');
    // };

    // const exportStatistics = (data) => {
    //     if (!data || !Array.isArray(data)) {
    //         alert("Không có dữ liệu để xuất!");
    //         return;
    //     }

    //     const csv = convertToCSV(data);
    //     const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    //     saveAs(blob, `statistics-${new Date().toISOString()}.csv`);
    // };



    const exportToExcel = async (data) => {
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet('Thống kê');

        let name = 'Thống kê';
        if (statType === 'orders') {
            // Thêm header
            sheet.addRow(['Thời gian', 'Số lượng đơn hàng']);
            name = 'Thống kê đơn hàng';
        } else if (statType === 'revenues') {
            // Thêm header
            sheet.addRow(['Thời gian', 'Doanh thu (VND)']);
            name = 'Thống kê doanh thu';
        }
        let total = 0;
        // Thêm dữ liệu
        data.forEach(item => {
            sheet.addRow([Object.keys(item)[0], Object.values(item)[0]]);
            total += Object.values(item)[0];
        });

        // Thêm t��ng doanh thu vào cuối dòng
        sheet.addRow(['Tổng', total]);

        // Xuất file
        const buffer = await workbook.xlsx.writeBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        saveAs(blob, `${name}-${new Date().toISOString()}.xlsx`);
    };

    return (
        <div>
            <div className="row gy-2">
                <div className="col-12 col-md-4">
                    <div className="card bg-info text-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-around align-items-center">
                                <i className="fa-solid fa-user-circle me-3 fs-3"></i>
                                <span className='d-inline fs-4'>Tài khoản</span>
                                <span className='ms-auto fs-3'>{countStatistics?.totalUsers}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card bg-warning text-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-around align-items-center">
                                <i className="fa-solid fa-shopping-cart me-3 fs-3"></i>
                                <span className='d-inline fs-4'>Đơn hàng</span>
                                <span className='ms-auto fs-3'>{countStatistics?.totalOrders}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card bg-success text-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-around align-items-center">
                                <i className="fa-solid fa-shopping-bag me-3 fs-3"></i>
                                <span className='d-inline fs-4'>Sản phẩm</span>
                                <span className='ms-auto fs-3'>{countStatistics?.totalProducts}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Bộ lọc */}
            <div className="row gy-2 align-items-center mt-3 mx-1 pb-3 border bg-light rounded">
                <div className="col-12 col-md-3">
                    <label htmlFor="statistics-type" className="form-label">Chọn kiểu thống kê</label>
                    <select id="statistics-type" className="form-select" value={statType} onChange={(e) => setStatType(e.target.value)}>
                        {/* <option value="accounts">Tài khoản</option> */}
                        {/* <option value="products">Sản phẩm</option> */}
                        <option value="orders">Đơn hàng</option>
                        <option value="revenues">Doanh thu</option>
                    </select>
                </div>
                <div className="col-12 col-md-3">
                    <label htmlFor="start-date" className="form-label">Ngày bắt đầu</label>
                    <input
                        type="date"
                        id="start-date"
                        className="form-control"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="col-12 col-md-3">
                    <label htmlFor="end-date" className="form-label">Ngày kết thúc</label>
                    <input
                        type="date"
                        id="end-date"
                        className="form-control"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="col-12 col-md-3 d-flex align-items-end gap-2" style={{ marginTop: '40px' }}>
                    <button className="btn btn-primary w-50" onClick={handleFetchStatistics}>Xem thống kê</button>
                    <button
                        className="btn btn-success w-50"
                        onClick={() => exportToExcel(statisticsData?.dataStatistical || [])}
                    >
                        Xuất thống kê
                    </button>
                </div>
            </div>

            {/* Hiển thị biểu đồ */}
            <div className="row gy-2 mt-4 mb-5">
                <div className="col d-flex flex-column justify-content-center align-items-center" style={{ maxHeight: '50vh' }}>
                    <h5 className=''>{statisticsData?.title}</h5>
                    {/* {statType === 'accounts' && <Pie data={pieData} />} */}
                    {/* {statType === 'products' && <Pie data={productData} />} */}
                    {statType === 'orders' && <Line data={orderData} />}
                    {statType === 'revenues' && <Bar data={revenueData} />}
                </div>

            </div>
        </div>
    );
};

export default HomeAdmin;

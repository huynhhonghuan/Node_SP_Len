import React, { useEffect, useState } from 'react';
import { getAccountStatistics, getOrderStatistics, getProductStatistics } from '../../../services/ChartService';
import { Pie, Bar, Line } from 'react-chartjs-2';

import { Chart as ChartJS, ArcElement, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend, BarElement, LineElement, CategoryScale, LinearScale, PointElement);



const HomeAdmin = () => {
    const [statisticsAccount, setStatisticsAccount] = useState();
    const [statisticsProduct, setStatisticsProduct] = useState();
    const [statisticsOrder, setStatisticsOrder] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseAccount = await getAccountStatistics();
                const responseProduct = await getProductStatistics();
                const responseOrder = await getOrderStatistics();
                console.log(responseAccount, responseProduct, responseOrder);
                setStatisticsAccount(responseAccount);
                setStatisticsProduct(responseProduct);
                setStatisticsOrder(responseOrder);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    // Dữ liệu cho biểu đồ tròn (Pie Chart)
    const pieData = {
        labels: ['Hoạt động', 'Không hoạt động'],
        datasets: [
            {
                label: 'Số tài khoản',
                data: [statisticsAccount?.activeUsers, statisticsAccount?.inactiveUsers],
                backgroundColor: ['#36A2EB', '#FF6384'],
                hoverBackgroundColor: ['#36A2EB', '#FF6384'],
            },
        ],
    };

    // Dữ liệu cho biểu đồ thanh (Bar Chart)
    const barData = {
        labels: ['Khách hàng', 'Nhân viên', 'Shipper'],
        datasets: [
            {
                label: 'Vai trò của người dùng',
                data: [
                    statisticsAccount?.usersRoleCustomer,
                    statisticsAccount?.usersRoleStaff,
                    statisticsAccount?.usersRoleShipper,
                ],
                backgroundColor: '#FFCE56',
                hoverBackgroundColor: '#FFCE56',
            },
        ],
    };

    // Dữ liệu cho biểu đồ Product (Pie Chart)
    const productData = {
        labels: ['Sản phẩm', 'Dụng cụ', 'Len'],
        datasets: [
            {
                label: 'Số lượng',
                data: [
                    statisticsProduct?.totalProductProduct,
                    statisticsProduct?.totalProductTool,
                    statisticsProduct?.totalProductWool,
                ],
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            },
        ],
    };

    // Dữ liệu cho biểu đồ Order (Line Chart)
    const orderData = {
        labels: ['30 ngày trước', '14 ngày trước', '7 ngày trước', 'Hôm nay'],
        datasets: [
            {
                label: 'Số lượng đơn hàng',
                data: [
                    statisticsOrder?.totalOrderLast30Days,
                    statisticsOrder?.totalOrderLast14Days,
                    statisticsOrder?.totalOrderLast7Days,
                    statisticsOrder?.totalOrderToday,
                ],
                fill: false,
                backgroundColor: '#42A5F5',
                borderColor: '#1E88E5',
            },
        ],
    };
    const chartOptions = {
        maintainAspectRatio: false, // Allows the chart to resize based on container
    };

    return (
        <div>
            <div className="row gy-2">
                <div className="col-12 col-md-3">
                    <div className="card bg-info text-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-around align-items-center">
                                <i className="fa-solid fa-user-circle me-3 fs-3"></i>
                                <span className='d-inline fs-4'>Tài khoản</span>
                                <span className='ms-auto fs-3'>{statisticsAccount?.totalUsers}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="card bg-warning text-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-around align-items-center">
                                <i className="fa-solid fa-shopping-cart me-3 fs-3"></i>
                                <span className='d-inline fs-4'>Đơn hàng</span>
                                <span className='ms-auto fs-3'>{statisticsOrder?.totalOrders}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="card bg-success text-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-around align-items-center">
                                <i className="fa-solid fa-shopping-bag me-3 fs-3"></i>
                                <span className='d-inline fs-4'>Sản phẩm</span>
                                <span className='ms-auto fs-3'>{statisticsProduct?.totalProducts}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-3">
                    <div className="card bg-secondary text-light">
                        <div className="card-body">
                            <div className="d-flex justify-content-around align-items-center">
                                <i class="fa-solid fa-file-excel me-3 fs-3"></i>
                                <span className='d-inline fs-4'>Excel</span>
                                <button className='btn btn-light ms-auto'>Xuất</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Vẽ biểu đồ */}
            <div className="row gy-2 mt-4 mb-5 d-flex justify-content-center">
                <div className="col-12 col-md-3 " style={{ maxHeight: '40vh' }}>
                    <h5 className="text-center">Tỷ lệ Người dùng Hoạt động</h5>
                    <Pie data={pieData} />
                </div>
                <div className="col-12 col-md-6" style={{ maxHeight: '40vh' }}>
                    <h5 className="text-center">Vai trò Người dùng</h5>
                    <Bar data={barData} />
                </div>
            </div>
            <div className="row gy-2 mt-4 mb-5 d-flex justify-content-center">
                <div className="col-12 col-md-3" style={{ maxHeight: '40vh' }}>
                    <h5 className="text-center">Phân loại Sản phẩm</h5>
                    <Pie data={productData} />
                </div>
                <div className="col-12 col-md-6" style={{ maxHeight: '40vh' }}>
                    <h5 className="text-center">Số lượng Đơn hàng theo thời gian</h5>
                    <Line data={orderData} />
                </div>
            </div>
        </div >
    );
};

export default HomeAdmin;

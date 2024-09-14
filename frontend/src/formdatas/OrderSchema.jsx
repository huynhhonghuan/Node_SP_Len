import { getAllOrders } from "../services/OrderService";

const OrderSchema = [
    {
        key: 'customerId',
        label: 'Mã khách hàng',
        type: 'text', // Could use select/autocomplete based on customer data
        validation: { required: true },
    },
    {
        key: 'products',
        label: 'Sản phẩm',
        type: 'group', // Representing a nested structure for multiple products
        component: null,
        fields: [
            {
                key: 'productId',
                label: 'Mã sản phẩm',
                type: 'text',
                validation: { required: true },
            },
            {
                key: 'optionId',
                label: 'Lựa chọn sản phẩm',
                type: 'text',
                validation: { required: true },
            },
            {
                key: 'quantity',
                label: 'Số lượng',
                type: 'number',
                validation: {
                    required: true,
                    min: 1,
                },
            },
            {
                key: 'price',
                label: 'Giá',
                type: 'number',
                validation: { required: true, min: 0 },
            },
        ],
    },
    {
        key: 'date',
        label: 'Ngày đặt hàng',
        type: 'date',
        validation: { required: true },
    },
    {
        key: 'totalPrice',
        label: 'Tổng giá',
        type: 'number',
        validation: { required: true, min: 0 },
    },
    {
        key: 'status',
        label: 'Trạng thái',
        type: 'select',
        options: [
            { value: 'pending', label: 'Chờ xử lý' },
            { value: 'processing', label: 'Đang xử lý' },
            { value: 'shipped', label: 'Đã giao hàng' },
            { value: 'failed', label: 'Thất bại' },
        ],
        validation: { required: true },
    },
    {
        key: 'paymentMethod',
        label: 'Phương thức thanh toán',
        type: 'select',
        options: [
            { value: 'cod', label: 'Thanh toán khi nhận hàng' },
            { value: 'vnpay', label: 'VNPay' },
        ],
        validation: { required: true },
    },
    {
        key: 'shippingAddress',
        label: 'Địa chỉ giao hàng',
        type: 'text', // Could also be select based on saved addresses
        validation: { required: true },
    },
    {
        key: 'note',
        label: 'Ghi chú',
        type: 'text',
        validation: { maxLength: 200 },
    }
];

const OrderPage = {
    list: {
        title: 'Danh sách đơn hàng',
        header: ['Mã khách hàng', 'Tổng giá', 'Trạng thái', 'Ngày đặt', 'Phương thức thanh toán'],
        header_hiddens: ['note', 'products', 'shippingAddress', '__v'],
        getData: getAllOrders,  // Assuming you have a service to fetch all orders
        deleteData: null, // Assuming a service to delete an order
        navigateCreate: 'create',
        navigateUpdate: 'update',
        nameDelete: 'customerId',  // Used for displaying the name when deleting an order
    },
    create: {
        title: 'Thêm mới đơn hàng',
        createData: null,  // Assuming you have a service to create an order
        navigateList: '/admin/orders',
        formSchema: OrderSchema,
    },
    update: {
        title: 'Cập nhật đơn hàng',
        getData: null,  // Assuming a service to fetch an order by ID
        updateData: null, // Assuming a service to update the order
        navigateList: '/admin/orders',
        formSchema: OrderSchema,
    },
};

export { OrderSchema, OrderPage };
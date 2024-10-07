import InputGroup from "../components/admin/InputGroup/InputGroup";
import { deleteOrder, getAllOrders, getOrderById, updateOrder } from "../services/OrderService";
import { getAllUsers, transformUser } from "../services/UserService";

const OrderSchema = [
    {
        key: 'customerId',
        label: 'Khách hàng',
        type: 'select',
        // options: async () => {
        //     const users = await getAllUsers();
        //     console.log(users);
        //     const data = [];
        //     data.push({ value: '', label: 'Chọn khách hàng' });
        //     users.forEach(user => data.push({ value: user._id, label: user.name }));
        //     return data;
        // },
        options: [],
        validation: { required: true },
    },
    {
        key: 'products',
        label: 'Sản phẩm',
        type: 'group', // Representing a nested structure for multiple products
        component: InputGroup, // Component chọn sản phẩm, cần tạo hoặc import từ trước
        fields: [
            {
                key: 'productId',
                label: 'Sản phẩm',
                type: 'select',
                // options: async () => {
                //     // Call API hoặc service để lấy danh sách sản phẩm
                //     const products = await getAllProducts();
                //     return products.map(product => ({ value: product._id, label: product.name }));
                // },
                options: [],
                validation: { required: true },
            },
            {
                key: 'optionId',
                label: 'Lựa chọn sản phẩm',
                type: 'select',
                options: [],
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
            // {
            //     key: 'price',
            //     label: 'Giá',
            //     type: 'number',
            //     validation: { required: true, min: 0 },
            // },
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
            { value: 'shipped', label: 'Đang giao hàng' },
            { value: 'completed', label: 'Đã giao hàng' },
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
        type: 'select', // Could also be select based on saved addresses
        options: [],  // Assuming a service to fetch all addresses
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
        header: ['Mã khách hàng', 'Ngày đặt', 'Tổng giá', 'Trạng thái', 'Phương thức thanh toán'],
        header_hiddens: ['note', 'products', 'discountId', 'feeShip', 'shippingAddress', '__v', 'paymentVnpay', 'createdAt', 'updatedAt'],
        header_count: [],
        getData: getAllOrders,  // Assuming you have a service to fetch all orders
        deleteData: deleteOrder, // Assuming a service to delete an order
        navigateCreate: 'create',
        navigateUpdate: 'update',
        nameDelete: 'customerId',  // Used for displaying the name when deleting an order
    },
    create: {
        title: 'Thêm mới đơn hàng',
        createData: null,  // Assuming you have a service to create an order
        navigateList: '/admin/order',
        formSchema: OrderSchema,
    },
    update: {
        title: 'Cập nhật đơn hàng',
        getData: getOrderById,  // Assuming a service to fetch an order by ID
        updateData: updateOrder, // Assuming a service to update the order
        navigateList: '/admin/order',
        formSchema: OrderSchema,
    },
};

export { OrderSchema, OrderPage };
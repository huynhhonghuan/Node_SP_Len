import InputGroup from "../components/admin/InputGroup/InputGroup";
import { createProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../services/ProductService";

const ProductSchema = [
    {
        key: 'name',
        label: 'Tên sản phẩm',
        type: 'text',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 200,
        },
    },
    {
        key: 'description',
        label: 'Mô tả sản phẩm',
        type: 'text',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 500,
        },
    },
    {
        key: 'image',
        label: 'Ảnh sản phẩm',
        type: 'file', // Hoặc 'file' nếu bạn muốn tải lên ảnh
        validation: {
            required: true,
        },
    },
    {
        key: 'type',
        label: 'Loại sản phẩm',
        type: 'select',
        options: [
            { value: 'wool', label: 'Sợi' },
            { value: 'product', label: 'Sản phẩm' },
            { value: 'tool', label: 'Dụng cụ' },
        ],
        validation: {
            required: true,
        },
    },
    {
        key: 'options',
        label: 'Tùy chọn sản phẩm',
        type: 'group',
        component: InputGroup,
        fields: [
            {
                key: 'image',
                label: 'Ảnh tùy chọn',
                type: 'file', // Hoặc 'file' nếu bạn muốn tải lên ảnh
                validation: {
                    required: true,
                },
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
                validation: {
                    required: true,
                    min: 1,
                },
            },
        ],
    },
    {
        key: 'note',
        label: 'Ghi chú',
        type: 'text',
        validation: {
            required: false,
            maxLength: 500,
        },
    },
    {
        key: 'comments',
        label: 'Bình luận',
        type: 'group',
        component: null,
        fields: [
            {
                key: 'userId',
                label: 'ID Người dùng',
                type: 'text',
                validation: {
                    required: true,
                },
            },
            {
                key: 'content',
                label: 'Nội dung bình luận',
                type: 'text',
                validation: {
                    required: true,
                },
            },
            {
                key: 'createdAt',
                label: 'Ngày tạo',
                type: 'date',
                validation: {
                    required: false,
                },
            },
        ],
    },
];

const ProductPage = {
    list: {
        title: 'Danh sách sản phẩm',
        header: ['Tên sản phẩm', 'Mô tả', 'Hình ảnh', 'Loại', 'Ghi chú', 'Ngày tạo', 'Ngày sửa', 'SL phiên bản', 'SL đánh giá'],
        header_hiddens: ['options', 'comments', '__v'],
        header_count: ['options', 'comments'],
        getData: getAllProducts,
        deleteData: deleteProduct,
        navigateCreate: 'create',
        navigateUpdate: 'update',
        nameDelete: 'name'
    },
    create: {
        title: 'Thêm mới sản phẩm',
        createData: createProduct,
        navigateList: '/admin/product',
        formSchema: ProductSchema,
    },
    update: {
        title: 'Cập nhật sản phẩm',
        getData: getProductById,
        updateData: updateProduct,
        navigateList: '/admin/product',
        formSchema: ProductSchema,
    }
}

export { ProductSchema, ProductPage };
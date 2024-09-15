import InputGroup from "../components/admin/InputGroup/InputGroup";
import { createComboProduct, deleteComboProduct, getAllComboProducts, getComboProductById, updateComboProduct } from "../services/ComboProductService";
import { transformOptionsForProduct, transformProductsToOptions } from "../services/ProductService";

const ComboProductSchema = [
    {
        key: 'name',
        label: 'Tên Combo',
        type: 'text',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 50,
        },
    },
    {
        key: 'description',
        label: 'Mô tả Combo',
        type: 'text',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 500,
        },
    },
    {
        key: 'products',
        label: 'Sản phẩm',
        type: 'group', // Sử dụng group cho việc chọn nhiều sản phẩm
        component: InputGroup, // Component chọn sản phẩm, cần tạo hoặc import từ trước
        fields: [
            {
                key: 'productId',
                label: 'Sản phẩm',
                type: 'select',
                options: [], // Nạp danh sách sản phẩm từ API hoặc service
                // getdata: transformOptionsForProduct,
                validation: {
                    required: true,
                },
            },
            {
                key: 'optionId',
                label: 'Lựa chọn sản phẩm',
                type: 'select',
                options: [], // Nạp danh sách lựa chọn từ API hoặc service
                // getdata: transformProductsToOptions,
                validation: {
                    required: true,
                },
            }
        ],
    },
    {
        key: 'price',
        label: 'Giá Combo',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        },
    },
];
const ComboProductPage = {
    list: {
        title: 'Danh sách Combo sản phẩm',
        header: ['Tên Combo', 'Mô tả', 'Giá', 'Ngày tạo', 'Ngày sửa', 'Số lượng sản phẩm'],
        header_hiddens: ['products', '__v'],
        header_count: ['products'], // Đếm số lượng sản phẩm trong combo
        getData: getAllComboProducts, // Hàm gọi API lấy danh sách Combo
        deleteData: deleteComboProduct, // Hàm gọi API xóa Combo
        navigateCreate: 'create',
        navigateUpdate: 'update',
        nameDelete: 'name' // Thuộc tính dùng để hiển thị tên khi xóa
    },
    create: {
        title: 'Thêm mới Combo sản phẩm',
        createData: createComboProduct, // Hàm gọi API để tạo Combo
        navigateList: '/admin/comboproduct', // Đường dẫn sau khi tạo xong
        formSchema: ComboProductSchema, // Sử dụng schema định nghĩa ở trên
    },
    update: {
        title: 'Cập nhật Combo sản phẩm',
        getData: getComboProductById, // Hàm gọi API lấy thông tin Combo theo ID
        updateData: updateComboProduct, // Hàm gọi API cập nhật Combo
        navigateList: '/admin/comboproduct', // Đường dẫn sau khi cập nhật xong
        formSchema: ComboProductSchema, // Sử dụng schema định nghĩa ở trên
    }
}
export { ComboProductSchema, ComboProductPage }
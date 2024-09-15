import AddressForm from "../components/admin/Address/Address";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from "../services/UserService";

const UserSchema = [
    {
        key: 'name',
        label: 'Họ và tên',
        type: 'text',
        validation: {
            required: true,
            minLength: 3,
            maxLength: 50,
        },
    },
    {
        key: 'email',
        label: 'Email',
        type: 'email',
        validation: {
            required: true,
            pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', // Email regex pattern
        },
    },
    {
        key: 'phone',
        label: 'Số điện thoại',
        type: 'text',
        validation: {
            required: true,
            pattern: '^\\d{10}$', // Assuming phone number validation for 10 digits
        },
    },
    {
        key: 'password',
        label: 'Mật khẩu',
        type: 'password',
        validation: {
            required: true,
            minLength: 8,
            maxLength: 50,
        }
    },
    {
        key: 'role',
        label: 'Loại tài khoản',
        type: 'select',
        options: [
            { value: 'customer', label: 'Khách hàng' },
            // { value: 'admin', label: 'Quản trị viên' },
            { value: 'staff', label: 'Nhân viên' },
        ],
        validation: { required: true },
    },
    {
        key: 'isActive',
        label: 'Trạng thái',
        type: 'radio',
        options: [
            { value: true, label: 'Hoạt động' },
            { value: false, label: 'Không hoạt động' },
        ],
        validation: { required: true },
    },
    {
        key: 'addresses',
        label: 'Địa chỉ',
        type: 'group', // Representing a nested structure for addresses
        component: AddressForm,
        fields: [
            {
                key: 'phone',
                label: 'Số điện thoại',
                type: 'text',
                validation: {
                    required: true,
                    pattern: '^\\d{10}$', // Phone number validation for 10 digits
                },
            },
            {
                key: 'city',
                label: 'Tỉnh/Thành phố',
                type: 'text',
                validation: { required: true },
            },
            {
                key: 'district',
                label: 'Quận/Huyện',
                type: 'text',
                validation: { required: true },
            },
            {
                key: 'ward',
                label: 'Phường/Xã',
                type: 'text',
                validation: { required: true },
            },
            {
                key: 'street',
                label: 'Đường phố',
                type: 'text',
                validation: { required: true },
            },
            {
                key: 'type',
                label: 'Loại địa chỉ',
                type: 'select',
                options: [
                    { value: 'home', label: 'Nhà riêng' },
                    { value: 'office', label: 'Văn phòng' },
                    { value: 'other', label: 'Khác' },
                ],
            },
            {
                key: 'note',
                label: 'Ghi chú',
                type: 'text',
                validation: {
                    maxLength: 200,
                },
            },
            {
                key: 'default',
                label: 'Mặc định',
                type: 'radio',
                options: [
                    { value: true, label: 'Mặc định' },
                    { value: false, label: 'Không' },
                ],
            },
        ],
    },
];

const UserPage = {
    list: {
        title: 'Danh sách người dùng',
        header: ['Họ và tên', 'Email', 'SDT', 'Loại', 'Trạng thái', 'Ngày tạo', 'Ngày sửa', 'SL địa chỉ'],
        header_hiddens: ['addresses', 'password', '__v',],
        header_count: ['addresses'],
        getData: getAllUsers,
        deleteData: deleteUser,
        navigateCreate: 'create',
        navigateUpdate: 'update',
        nameDelete: 'name'
    },
    create: {
        title: 'Thêm mới người dùng',
        createData: createUser,
        navigateList: '/admin/account',
        formSchema: UserSchema,
    },
    update: {
        title: 'Cập nhật người dùng',
        getData: getUserById,
        updateData: updateUser,
        navigateList: '/admin/account',
        formSchema: UserSchema,
    }
}

export { UserSchema, UserPage };
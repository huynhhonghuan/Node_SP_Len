import { createDiscount, deleteDiscount, getAllDiscounts, getDiscountById, updateDiscount } from "../services/DiscountService";

const DiscountSchema = [
    {
        key: 'code',
        label: 'Mã giảm giá',
        type: 'text',
        validation: {
            required: true,
            minLength: 5,
            maxLength: 10,
        }
    },
    {
        key: 'percentage',
        label: 'Tỉ lệ giảm giá (%)',
        type: 'number',
        validation: {
            required: true,
            min: 0,
            max: 100,
            step: 5
        }
    },
    {
        key: 'startDate',
        label: 'Ngày bắt đầu',
        type: 'date',
        validation: {
            required: true,
        }
    },
    {
        key: 'endDate',
        label: 'Ngày kết thúc',
        type: 'date',
        validation: {
            required: true,
            validate: (value) => value > new Date() // Validate that endDate is after startDate
        }
    },
    {
        key: 'lowestTotal',
        label: 'Tổng giá trị đơn hàng thấp nhất',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        }
    },
    {
        key: 'counts',
        label: 'Số lần sử dụng',
        type: 'number',
        validation: {
            required: true,
            min: 0,
        }
    },
    {
        key: 'isActive',
        label: 'Trạng thái',
        type: 'radio',
        options: [
            { value: true, label: 'Hoạt động' },
            { value: false, label: 'Không hoạt động' },
        ],
        validation: {
            required: true,
        }
    }
];

const DiscountPage = {
    list: {
        title: 'Danh sách mã giảm giá',
        header: ['Mã giảm', 'Giảm(%)', 'Ngày bắt đầu', 'Ngày kết thúc', 'Tối thiểu (VND)', 'SL', 'Trạng thái', 'Ngày tạo', 'Ngày sửa', 'SL khách đã áp mã'],
        header_hiddens: ['customersId', '__v',],
        header_count: ['customersId'],
        getData: getAllDiscounts,
        deleteData: deleteDiscount,
        navigateCreate: 'create',
        navigateUpdate: 'update',
        nameDelete: 'code'
    },
    create: {
        title: 'Thêm mới mã giảm giá',
        createData: createDiscount,
        navigateList: '/admin/discount',
        formSchema: DiscountSchema,
    },
    update: {
        title: 'Cập nhật mã giảm giá',
        getData: getDiscountById,
        updateData: updateDiscount,
        navigateList: '/admin/discount',
        formSchema: DiscountSchema,
    }
}

export { DiscountSchema, DiscountPage };
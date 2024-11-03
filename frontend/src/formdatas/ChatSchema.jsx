import { getAllChat } from "../services/ChatbotService";

const ChatSchema = [
    {
        key: 'customerId',
        label: 'Khách hàng',
        type: 'select', // Chọn khách hàng nếu có tài khoản
        options: [], // Bạn có thể lấy danh sách khách hàng từ API và đổ vào đây
        validation: {
            required: false, // Vì khách hàng có thể là khách vãng lai
        },
    },
    {
        key: 'recipientId',
        label: 'Người tiếp nhận',
        type: 'select', // Chọn người tiếp nhận (admin hoặc nhân viên)
        options: [], // Lấy danh sách admin hoặc nhân viên từ API
        validation: {
            required: true,
        },
    },
    {
        key: 'messages',
        label: 'Tin nhắn',
        type: 'group', // Nhóm tin nhắn
        fields: [
            {
                key: 'content',
                label: 'Nội dung',
                type: 'text',
                validation: {
                    required: true,
                },
            },
            {
                key: 'reply',
                label: 'Phản hồi từ',
                type: 'radio',
                options: [
                    { value: 'customer', label: 'Khách hàng' },
                    { value: 'shop', label: 'Cửa hàng' },
                ],
                validation: {
                    required: true,
                },
            },
        ],
    },
    {
        key: 'status',
        label: 'Trạng thái cuộc trò chuyện',
        type: 'select',
        options: [
            { value: 'pending', label: 'Chờ tiếp nhận' },
            { value: 'received', label: 'Đã tiếp nhận' },
            { value: 'processing', label: 'Đang xử lý' },
            { value: 'completed', label: 'Hoàn thành' },
            { value: 'cancelled', label: 'Không tiếp nhận' },
        ],
        validation: {
            required: true,
        },
    },
    {
        key: 'startedAt',
        label: 'Thời gian bắt đầu',
        type: 'date',
        validation: {
            required: true,
        },
    },
    {
        key: 'completedAt',
        label: 'Thời gian hoàn thành',
        type: 'date',
        validation: {
            required: false,
        },
    },
];

const ChatPage = {
    list: {
        title: 'Danh sách cuộc trò chuyện',
        header: ['Khách hàng', 'Người tiếp nhận', 'Trạng thái', 'Bắt đầu', 'Hoàn thành'],
        header_hiddens: ['messages', '__v', 'createdAt', 'updatedAt'],
        header_count: [],
        getData: getAllChat,
        deleteData: () => {/* Hàm xóa cuộc trò chuyện */ },
        navigateCreate: 'create',
        navigateUpdate: 'update',
        nameDelete: 'customerId'
    },
    create: {
        title: 'Tạo mới cuộc trò chuyện',
        createData: () => {/* Hàm tạo cuộc trò chuyện */ },
        navigateList: '/admin/chat',
        formSchema: ChatSchema,
    },
    update: {
        title: 'Cập nhật cuộc trò chuyện',
        getData: () => {/* Hàm lấy chi tiết cuộc trò chuyện */ },
        updateData: () => {/* Hàm cập nhật cuộc trò chuyện */ },
        navigateList: '/admin/chat',
        formSchema: ChatSchema,
    }
}

export { ChatSchema, ChatPage };

import { toast } from 'react-toastify';  // Import toast
import 'react-toastify/dist/ReactToastify.css';  // Import CSS cho Toast

const ToastAction = ({ action, message }) => {
    const showToast = () => {
        switch (action) {
            case 'create':
                toast.success(message || 'Thêm thành công!', {
                    icon: '🟢',
                });
                break;
            case 'update':
                toast.success(message || 'Sửa thành công!', {
                    icon: '✏️',
                });
                break;
            case 'delete':
                toast.success(message || 'Xóa thành công!', {
                    icon: '🗑️',
                });
                break;
            case 'error':
                toast.error(message || 'Lỗi khi hành động', {
                    icon: '🗑️',
                });
                break;
            default:
                toast('Hành động không xác định');
                break;
        }
    };

    return showToast();
};


export default ToastAction;

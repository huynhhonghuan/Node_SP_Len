import Cookies from 'js-cookie';

export const token = () => {
    return Cookies.get('token');  // Lấy token từ cookie
}

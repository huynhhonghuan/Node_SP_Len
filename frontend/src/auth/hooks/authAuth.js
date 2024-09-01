import { useSelector } from 'react-redux';

const useAuth = () => {
    const user = useSelector((state) => state.auth.user);
    const role = useSelector((state) => state.auth.role);

    return { user, role };
};

export default useAuth;

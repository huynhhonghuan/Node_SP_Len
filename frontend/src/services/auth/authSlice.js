import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        role: null,
    },
    reducers: {
        login: (state, action) => {
            // Cập nhật trạng thái khi đăng nhập
            state.user = action.payload.user;
            state.role = action.payload.role;
        },
        logout: (state) => {
            // Cập nhật trạng thái khi đăng xuất
            state.user = null;
            state.role = null;
        },
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

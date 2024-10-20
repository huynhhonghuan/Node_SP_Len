const UserRepository = require('../repository/userRepository');
const createTokenUser = require('../utils/createTokenUser');
const { createJwt, attachCookiesToResponse } = require('../utils/jwt');

class AuthProvider {
    async login(email, password, res) {

        const user = await UserRepository.getUserByEmail(email);

        if (!user) {
            return { user: [], message: 'User not found' }
        }

        // So sánh mật khẩu
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return { user: [], message: 'Invalid credentials' };
        }

        const userForToken = createTokenUser(user);

        const token = attachCookiesToResponse({ res, user: userForToken });

        return { user: user, token: token, message: 'Login successful!' };
    }

    async register(name, phone, email, password) {

        // const existingUser = await UserRepository.getUserByEmail(email);

        // console.log(existingUser);

        // if (existingUser) {
        //     return { user: null, message: 'Email đã tồn tại!' };
        // }

        // const existingPhone = await UserRepository.getUserByPhone(phone);

        // if (existingPhone) {
        //     return { user: null, message: 'Số điện thoại đã tồn tại!' };
        // }
        // console.log(userData);
        const userData = { name, phone, email, password };

        const user = await UserRepository.createUser(userData);

        return { user, message: 'Đăng ký thành công!' };
    }

    async changePassword(id, oldPassword, newPassword) {
        const user = await UserRepository.getUserById(id);
        if (!user) {
            return { user: null, message: 'User not found!' };
        }

        const isMatch = await user.comparePassword(oldPassword);

        if (!isMatch) {
            return { user: null, message: 'Mật khẩu cũ không chính xác!' };
        }
        user.password = newPassword;
        await user.save();
        return { user, message: 'Đổi mật khẩu thành công!' };
    }
}

module.exports = new AuthProvider();
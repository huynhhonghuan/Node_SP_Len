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

    async register(userData) {

        const existingUser = await UserRepository.getUserByEmail(userData.email);

        if (existingUser) {
            return [];
        }
        // console.log(userData);

        const user = await UserRepository.createUser(userData);

        return { user };
    }
}

module.exports = new AuthProvider();
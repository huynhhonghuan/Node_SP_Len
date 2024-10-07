const User = require('../models/user');

class UserRepository {
    async getAllUsers() {
        return await User.find({ role: { $ne: 'admin' } });
    }

    async getUserById(id) {
        return await User.findById(id);
    }

    async getUserByEmail(email) {
        return await User.findOne({ email });
    }

    async getUserByPhone(phone) {
        return await User.findOne({ phone });
    }

    async createUser(user) {
        return await User.create(user);
    }

    async updateUser(id, updatedUser) {
        return await User.findByIdAndUpdate(id, updatedUser, { new: true });
    }

    async deleteUser(id) {
        return await User.findByIdAndDelete(id);
    }

    async updateActiveUser(id) {
        const user = await User.findById(id);
        return await User.findByIdAndUpdate(id, { isActive: !user.isActive }, { new: true, fields: { isActive: true } });
    }
}

module.exports = new UserRepository();
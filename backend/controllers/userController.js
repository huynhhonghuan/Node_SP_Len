const UserRepository = require('../repository/userRepository');

const getAllUsers = async (req, res) => {
    try {
        const users = await UserRepository.getAllUsers();
        res.json({ users: users, message: 'All users' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getUserById = async (req, res) => {
    try {
        const user = await UserRepository.getUserById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: user, message: 'User found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
const getUserByEmail = async (req, res) => {
    try {
        const user = await UserRepository.getUserByEmail(req.params.email);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: user, message: 'User found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createUser = async (req, res) => {
    try {
        const user = await UserRepository.createUser(req.body);
        res.json({ user: user, message: 'User created' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    try {
        const updatedUser = await UserRepository.updateUser(req.params.id, req.body);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: updatedUser, message: 'User updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    try {
        const deletedUser = await UserRepository.deleteUser(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateActiveUser = async (req, res) => {
    try {
        const updatedUser = await UserRepository.updateActiveUser(req.params.id);
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user: updatedUser, message: 'User active status updated' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    updateUser,
    deleteUser,
    updateActiveUser,
}
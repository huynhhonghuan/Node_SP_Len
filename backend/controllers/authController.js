const authProvider = require('../providers/authProvider');

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await authProvider.login(email, password, res);
        return res.status(200).json({ user: result.user, token: result.token, message: result.message });
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
}

const registerUser = async (req, res) => {
    try {
        const { name, phone, email, password } = req.body;

        const user = await authProvider.register(name, phone, email, password);

        res.json({ user: user.user, message: user.message });

    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

const logoutUser = async (req, res) => {
    try {
        res.clearCookie('token');
        // res.cookie('token', 'logout', {
        //     httpOnly: true,
        //     expires: new Date(Date.now() + 1000),
        // });

        res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
};
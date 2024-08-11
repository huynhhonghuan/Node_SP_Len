const jwt = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'You are not authenticated' });
        }
        const isToken = jwt.verifyToken(token);
        if (!isToken) {
            return res.status(403).json({ message: 'Invalid token' });
        }
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Token is not valid' });
    }
}

const authorizeRoles = (...role) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!role.includes(userRole)) {
            return res.status(403).json({ message: 'Unauthorized' });
        }
        next();
    }
}

module.exports = {
    authMiddleware,
    authorizeRoles,
};
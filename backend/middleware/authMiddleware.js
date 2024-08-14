const { verifyToken } = require('../utils/jwt');

const authMiddleware = async (req, res, next) => {

    // check first if send in header 
    let token;
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
    }

    // otherwise check if sent in cookies
    else if (req.cookies.token) {
        token = req.cookies.token;
    }

    if (!token) {
        return res.status(401).json({ message: 'You are not authenticated' });
    }

    try {
        const isToken = verifyToken(token);

        req.user = {
            id: isToken.id,
            name: isToken.name,
            role: isToken.role,
        };

        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Token is not valid; ' + error.message });
    }
}

const authorizeRoles = (...role) => {
    return (req, res, next) => {
        const userRole = req.user.role;
        if (!role.includes(userRole)) {
            return res.status(403).json({ message: 'Forbidden!' });
        }
        next();
    }
}

module.exports = {
    authMiddleware,
    authorizeRoles,
};
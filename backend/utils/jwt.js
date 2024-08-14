const jwt = require('jsonwebtoken');

const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET_PRODUCTION);

const createJwt = ({ payload }) => {
    const token = jwt.sign(payload, process.env.JWT_SECRET_PRODUCTION, { expiresIn: '1h' });
    return token;
}

// this is for setup the cookies for web , with cookies ,
const attachCookiesToResponse = ({ res, user }) => {
    const token = createJwt({ payload: user });

    const oneDay = 1000 * 60 * 60 * 24;

    res.cookie('token', token, {
        httpOnly: true,
        expires: new Date(Date.now() + oneDay),
        secure: process.env.NODE_ENV === 'production',
        signed: true,
    });

    return token;
};

module.exports = {
    verifyToken,
    createJwt,
    attachCookiesToResponse,
};
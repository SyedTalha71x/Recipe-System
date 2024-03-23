const jwt = require('jsonwebtoken');
const JWT_SECRET = '1234567890';

const adminuser = (req, res, next) => {
    const token = req.header('auth-token');
    try {
        if (!token) {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        const verifyToken = jwt.verify(token, JWT_SECRET);
        req.user = verifyToken.user;
        next();
        // if (verifyToken.role == 'admin' && verifyToken.role == 'user') {
        //     req.user = verifyToken;
        //     next();
        // }
    }
    catch (error) {
        console.log(error);
        res.status(401).json({ message: 'Error' });
    }
}

module.exports = adminuser;

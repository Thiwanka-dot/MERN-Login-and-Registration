const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
    try {
        const {token} = req.cookies; // Get token from cookies
        if(!token){
            return res.status(401).json({
                message: 'Access denied. No token provided!'
            })
        };

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded; // Attach user data to request
        next();

    } catch (error) {
        res.status(500).json({
            message: 'Invalid Token!'
        })
    }
};

module.exports = authMiddleware;
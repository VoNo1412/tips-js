const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    try {
        const token = req.header('Authorization')?.split(" ")[1] || req.cookies.ACCESS_TOKEN;
        console.log("This is token: ", token);
        if (!token) {
            return res.status(401).json({ message: 'Access denied. Token missing.' });
        }

        const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Error in authenticateToken:', error);
        return res.status(403).json({ message: 'Access denied. Invalid token.' });
    }

};

const authorizeRole = (requiredRole) => (req, res, next) => {
    try {
        if (!req.user || req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Permissions denied.' });
        }
        next();
    } catch (error) {
        console.error('Error in authorizeRole:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};



module.exports = {
    authenticateToken,
    authorizeRole,
};

const jwt = require('jsonwebtoken');

const generateAccessToken = (user) => {
    return jwt.sign(
        { userId: user.id, username: user.username, role: user.role, permissions: user.permissions },
        process.env.ACCESS_SECRET,
        { expiresIn: process.env.ACCESS_EXPIRES }
    );
};

const generateRefreshToken = (user) => {
    return jwt.sign(
        { userId: user.id, username: user.username, role: user.role, permissions: user.permissions },
        process.env.REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_EXPIRES }
    );
};

const clearAllCookies = (req, res, next) => {
    const cookies = req.cookies;

    // Iterate over each cookie and clear it
    for (const cookieName in cookies) {
        res.clearCookie(cookieName);
    }

    next();
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    clearAllCookies
}

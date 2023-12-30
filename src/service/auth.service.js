const userService = require('./user.service');

const clearAllCookies = async (req, res, next) => {
    const cookies = req.cookies;
    const user = req.user;

    await userService.updateUser(user.userId, { isActive: false })
    // Update user status
    for (const cookieName in cookies) {
        res.clearCookie(cookieName);
    }

    console.log("FACK_+++++++++++++++++++++++++++++");

    // Send a JSON response after clearing cookies
    res.send({ status: 'success', message: 'logout' });
}

module.exports = {
    clearAllCookies
};

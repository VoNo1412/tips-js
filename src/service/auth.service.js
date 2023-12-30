const clearAllCookies = (req, res, next) => {
    const cookies = req.cookies;

    // Iterate over each cookie and clear it
    for (const cookieName in cookies) {
        res.clearCookie(cookieName);
    }
    res.json({status: "success", message: "logout"})
};

module.exports = {
    clearAllCookies
}
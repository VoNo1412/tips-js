// const userService = require('./user.service');

// const clearAllCookies = async (req, res, next) => {
//     const cookies = req.cookies;
//     const user = req.user;

//     await userService.updateUser(user.userId, { isActive: false })
//     // Update user status
//     for (const cookieName in cookies) {
//         res.clearCookie(cookieName);
//     }

//     console.log("FACK_+++++++++++++++++++++++++++++");

//     // Send a JSON response after clearing cookies
//     res.send({ status: 'success', message: 'logout' });
// }

// module.exports = {
//     clearAllCookies
// };

class AuthService {
    signup = async (req, res, next) => {
        try {
            const { username, password, role, permission } = req.body;
            if (!username || !password || !role) {
                return res.status(400).json({ message: 'Username, password, and role are required.' });
            }
            // Hash and salt the password before saving to the database
            const hashedPassword = await bcrypt.hash(password, 10);
            // Call the userService function to create a new user
            const newUser = await userService.createUser(username, hashedPassword, role, permission);
            if (newUser.status === 200) {
                // Generate JWT token
                const token = await authHelper.generateAccessToken(newUser);
                return token;
            }
        } catch (error) {
            console.error('Error in signup:', error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    };
}

module.exports = new AuthService();
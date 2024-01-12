const bcrypt = require('bcrypt');
const userService = require("../service/user.service");
const authHelper = require("../helper/auth.helper");
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../configs/constants');
const authService = require('../service/auth.service');

class AuthController {
    signUp = (req, res, next) => {
        try {
            console.log('::signUp: ', req.body);
            const data = authService.signup(req, res, next);
            console.log('::data: ', data);
            return res.status(201).json({
                code: "20001",
                data
            })
        } catch (error) {
            throw error;
        }
    }
}




// const login = async (req, res, next) => {
//     try {
//         const { username, password } = req.body;
//         console.log({ username, password })
//         const user = await userService.getUserByUsername(username);
//         const isCheckPassword = await bcrypt.compare(password, user.password);
//         if (!user || !isCheckPassword) {
//             return res.status(401).json({ message: 'Invalid credentials.' });
//         }

//         const userValue = {
//             id: user.dataValues.id,
//             username: user.dataValues.username,
//             password: user.dataValues.password,
//             role: user.dataValues.role,
//             permission: user.dataValues.permission,
//         }
//         await userService.updateUser(userValue.id, { isActive: true });

//         // Generate JWT token
//         const accessToken = await authHelper.generateAccessToken(userValue);
//         const refreshToken = await authHelper.generateRefreshToken(userValue)

//         // Set cookies for both access and refresh tokens
//         res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: true, maxAge: process.env.ACCESS_EXPIRES }); // Access token expires in 1 hour
//         res.cookie(REFRESH_TOKEN, refreshToken, { httpOnly: true, maxAge: process.env.REFRESH_EXPIRES }); // Refresh token expires in 30 days

//         res.json({ message: 'Login successful.', data: { accessToken, refreshToken } });
//     } catch (error) {
//         console.error('Error in login:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

module.exports = new AuthController();
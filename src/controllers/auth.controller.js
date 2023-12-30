const bcrypt = require('bcrypt');
const userService = require("../service/user.service");
const authHelper = require("../helper/auth.helper");
const { ACCESS_TOKEN, REFRESH_TOKEN } = require('../configs/constants');

const signup = async (req, res) => {
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

            res.status(201).json({ status: 'OK', message: 'success', data: { user: newUser, token } });
        }
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = await userService.getUserByUsername(username);
        const isCheckPassword = await bcrypt.compare(password, user.password);
        if (!user || !isCheckPassword) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }
        // console.log('user: ', user.dataValues.username)
        const userValue = {
            id: user.dataValues.id,
            username: user.dataValues.username,
            password: user.dataValues.password,
            role: user.dataValues.role,
            permission: user.dataValues.permission,
        }
        // Generate JWT token
        const accessToken = await authHelper.generateAccessToken(userValue);
        const refreshToken = await authHelper.generateRefreshToken(userValue)
        // Clear existing cookies
        authHelper.clearAllCookies(req, res, next);

        // Set cookies for both access and refresh tokens
        res.cookie(ACCESS_TOKEN, accessToken, { httpOnly: true, maxAge: process.env.ACCESS_EXPIRES }); // Access token expires in 1 hour
        res.cookie(REFRESH_TOKEN, refreshToken, { httpOnly: true, maxAge: process.env.REFRESH_EXPIRES }); // Refresh token expires in 30 days

        res.json({ message: 'Login successful.', data: { accessToken, refreshToken } });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    signup,
    login,
};

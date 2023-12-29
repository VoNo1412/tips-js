const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userService = require("../service/user.service");


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
            const token = jwt.sign(
                {
                    userId: newUser.id,
                    username: newUser.username,
                    role: newUser.role,
                    permissions: newUser.permissions
                },
                process.env.SECRET,
                { expiresIn: process.env.EXPIRES }
            );

            res.status(201).json({ status: 'OK', message: 'success', data: { user: newUser, token } });
        }
    } catch (error) {
        console.error('Error in signup:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await userService.getUserByUsername(username);
        const isCheckPassword = await bcrypt.compare(password, user.password);
        if (!user || !isCheckPassword) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign(
            { userId: user.id, username: user.username, role: user.role, permissions: user.permissions },
            process.env.SECRET,
            { expiresIn: process.env.EXPIRES }
        );

        res.json({ message: 'Login successful.', data: { user, token: 'Bearer ' + token } });
    } catch (error) {
        console.error('Error in login:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {
    signup,
    login,
};

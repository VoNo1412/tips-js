const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/protected', authenticateToken, authorizeRole('admin'), (req, res) => {
    res.json({ message: 'This is a protected route.', user: req.user });
});
router.get('/user', authenticateToken, authorizeRole('user'), (req, res) => {
    res.json({ message: 'This is a protected route.', user: req.user });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authenticateToken, authorizeRole } = require('../middleware/auth.middleware');
const authService = require('../service/auth.service');
const passport = require('passport');

router.post('/signup', authController.signup);
router.post('/login', passport.authenticate('local'), authController.login);

router.get('/protected', authenticateToken, authorizeRole('admin'), (req, res) => res.json({message: 'success'}));

router.get('/error', (req, res) => {
    res.json({ message: 'Please check your account', user: req.user });
});

router.get('/user', authenticateToken, authorizeRole('user'), (req, res) => {
    res.json({ message: 'This is a protected route.', user: req.user });
});

router.get('/logout', authService.clearAllCookies);

module.exports = router;

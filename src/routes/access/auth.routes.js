const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRole } = require('../../middleware/auth.middleware');
const authService = require('../../service/auth.service');
const userService = require('../../service/user.service');
const passport = require('passport');
const authController = require('../../controllers/auth.controller');

console.log('before run inside');
router.post('/auth/signup', authController.signUp);
console.log('after run inside');  
// router.post('/login', passport.authenticate('local'), authController.login);
// // router.get('/logout', authenticateToken, authService.clearAllCookies);

// router.get('/protected', authenticateToken, authorizeRole('admin'), (req, res) => res.json({ message: 'success' }));

// router.get('/error', (req, res) => {
//     res.json({ message: 'Please check your account', user: req.user });
// });

// router.get('/user', authenticateToken, authorizeRole('user'), (req, res) => {
//     res.json({ message: 'This is a protected route.', user: req.user });
// });


module.exports = router;

const express = require('express');
const {userRegistration, userLogin, userPasswordForget, userPasswordReset, userVerifyEmail, userLogout} = require('../controllers/controller-user');
const authMiddleware = require('../middleware/authMiddleware');

const authRouter = express.Router();
authRouter.post('/register', userRegistration);
authRouter.post('/login', userLogin);
authRouter.post('/forget-password', userPasswordForget);
authRouter.post('/reset-password/:token', userPasswordReset);
authRouter.post('/verify-email/:token', userVerifyEmail);
authRouter.post('/logout', authMiddleware, userLogout);

module.exports = authRouter;
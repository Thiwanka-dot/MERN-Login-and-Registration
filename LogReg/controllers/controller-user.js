const User = require("../modules/User");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail/sendEmail");
const crypto = require('crypto');

const userRegistration = async (req, res) => {
    try {
        const {name, email, password, isVerified, resetPasswordToken, resetPasswordExpires} = req.body;

        // Check if user already exists
        const user = await User.findOne({email});
        
        if(user){
            return res.status(400).json({
                message: "User already exists!"
            })
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        // Generate verification token
        const verificationToken = crypto.randomBytes(32).toString('hex');

        // Create new user
        const newUser = new User({
            name,
            email,
            password: hashPassword,
            isVerified,
            verificationToken,
            resetPasswordToken,
            resetPasswordExpires
        });

        await newUser.save();

        // Create verification link
        const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`; 
        // Frontend URL // http://localhost:5173/verify-email/${verificationToken}

        // Email content
        const emailContent = `
            <h2>Email Verification</h2>
            <p>Click the link below to verify your email:</p>
            <a href="${verificationLink}" target="_blank">${verificationLink}</a>
        `;

        // Send Email
        await sendEmail(newUser.email, 'Verify Your Email', emailContent);

        // response send client side
        res.status(201).json({
            message:'User created successfully!',
            newUser
        })
    } catch (error) {
        res.status(500).json({
            message: 'Server error!'
        })
    }
    
};

const userLogin = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({
            email
        });

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({
                message: 'Invalid email or password!'
            })
        }

        // Generate JWT token
        const token = jwt.sign({userId: user?._id, userEmail: user?.email}, process.env.ACCESS_TOKEN, {
            expiresIn: '1h'
        });

        // Send token as a cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        }).status(200).json({
            message: 'Login successfully!',
            token
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error!'
        })
    }
};

const userPasswordForget = async (req, res) => {
    try {
        const {email} = req.body;

        // Check if user exists
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                message: 'User not found!'
            })
        };

        // Generate reset password token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1hr

        await user.save();

        // Create a reset password link
        const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        // Frontend URL // http://localhost:5173/reset-password/${resetToken}

        // Email content
        const emailContent = `
            <h2>Password Reset Request</h2>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}" target="_blank">${resetLink}</a>
            <p>This link will expire in 1 hour</p>
        `;

        // Send Email
        await sendEmail(user.email, 'Password reset request', emailContent);

        res.status(200).json({
            message: 'Password resent email sent!',
            resetToken
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server error!'
        });
    }
};

const userPasswordReset = async (req, res) => {
    try {
        const {token} = req.params;
        const {password} = req.body;

        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: {$gt: Date.now()}
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token!' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;

        await user.save();

        res.status(200).json({
            message: 'Password reset successfully!',
            user
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error!' });
    }
};

const userVerifyEmail = async (req, res) => {
    try {
        const {token} = req.params;

        // Find user by verification token
        const user = await User.findOne({verificationToken: token});
        if(!user){
            return res.status(400).json({
                message: 'Invalid or expired token!'
            })
        };

        // Make user as verified
        user.isVerified = true;
        user.verificationToken = undefined;

        await user.save();

        res.status(200).json({
            message: 'Email verified successfully!',
            user
        })

    } catch (error) {
        res.status(500).json({
            message: 'Server error!'
        });
    }
};

const userLogout = async (req, res) => {
    try {
        res.clearCookie('token',
            //optional 
            {
                httpOnly: true,
                secure: false,
                samesite: 'strict'
            }
        );

        res.status(200).json({
            message: 'Logged out successfully!'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Server error!'
        });
    }
}

module.exports = {
    userRegistration,
    userLogin,
    userPasswordForget,
    userPasswordReset,
    userVerifyEmail,
    userLogout
}
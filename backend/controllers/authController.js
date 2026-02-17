const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const authService = require('../services/authService');
const config = require('../config/config');


// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    console.log('--- Registration Attempt ---');
    console.log('Body:', { ...req.body, password: '***' });
    const { name, email, password } = req.body;

    const userExists = await authService.findUserByEmail(email);

    if (userExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const user = await authService.createUser({
        name,
        email,
        password
    });

    if (user) {
        generateToken(res, user._id);
        res.status(201).json({
            success: true,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    console.log('--- Login Attempt ---');
    console.log('Email:', req.body.email);
    const { email, password } = req.body;

    const user = await authService.findUserByEmail(email);

    if (user && (await user.matchPassword(password))) {
        generateToken(res, user._id);
        res.json({
            success: true,
            data: {
                _id: user.id,
                name: user.name,
                email: user.email,
            }
        });
    } else {
        res.status(401);
        throw new Error('Invalid email or password');
    }
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Public
const logoutUser = (req, res) => {
    res.cookie('jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully'
    });
};

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    res.status(200).json({
        success: true,
        data: req.user
    });
});

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await authService.findUserById(req.user.id);

    if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

        if (req.body.password) {
            console.log('--- Updating Password ---');
            user.password = req.body.password;
        }

        const updatedUser = await user.save();
        console.log('--- Profile Updated Successfully ---');

        res.json({
            success: true,
            data: {
                _id: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
            }
        });
    } else {
        res.status(404);
        throw new Error('User not found');
    }
});

// Generate JWT and set in cookie
const generateToken = (res, id) => {
    const token = jwt.sign({ id }, config.JWT_SECRET, {
        expiresIn: '30d',
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Must be true for sameSite: 'none'
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // Allow cross-site in production
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    getMe,
    updateUserProfile,
};

const User = require('../models/User');

const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

const createUser = async (userData) => {
    return await User.create(userData);
};

const findUserById = async (id) => {
    return await User.findById(id);
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById
};

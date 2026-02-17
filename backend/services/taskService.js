const Task = require('../models/Task');

const getUserTasks = async (userId) => {
    return await Task.find({ user: userId });
};

const createTask = async (taskData) => {
    return await Task.create(taskData);
};

const getTaskById = async (id) => {
    return await Task.findById(id);
};

const updateTaskById = async (id, updateData) => {
    return await Task.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteTaskById = async (id) => {
    const task = await Task.findById(id);
    if (task) {
        await task.deleteOne();
        return true;
    }
    return false;
};

module.exports = {
    getUserTasks,
    createTask,
    getTaskById,
    updateTaskById,
    deleteTaskById
};

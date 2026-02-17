const asyncHandler = require('express-async-handler');
const taskService = require('../services/taskService');

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
    const tasks = await taskService.getUserTasks(req.user.id);
    res.status(200).json({
        success: true,
        data: tasks
    });
});

// @desc    Set task
// @route   POST /api/tasks
// @access  Private
const setTask = asyncHandler(async (req, res) => {
    console.log('--- Task Creation Attempt ---');
    console.log('Body:', req.body);
    console.log('User ID from token:', req.user?._id);

    if (!req.body.text) {
        res.status(400);
        throw new Error('Please add a text field');
    }

    try {
        const task = await taskService.createTask({
            text: req.body.text,
            user: req.user._id,
        });

        res.status(201).json({
            success: true,
            data: task
        });
    } catch (error) {
        console.error('Task Creation Error:', error);
        res.status(500);
        throw new Error('Server error adding task');
    }
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedTask = await taskService.updateTaskById(req.params.id, req.body);

    res.status(200).json({
        success: true,
        data: updatedTask
    });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
    const task = await taskService.getTaskById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Make sure the logged in user matches the task user
    if (task.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('User not authorized');
    }

    await taskService.deleteTaskById(req.params.id);

    res.status(200).json({
        success: true,
        data: { id: req.params.id }
    });
});

module.exports = {
    getTasks,
    setTask,
    updateTask,
    deleteTask,
};

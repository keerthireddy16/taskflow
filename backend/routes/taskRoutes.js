const express = require('express');
const router = express.Router();
const {
    getTasks,
    setTask,
    updateTask,
    deleteTask,
} = require('../controllers/taskController');

const { protect } = require('../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array()[0].msg }); // Return first error message for simplicity in frontend
    }
    next();
};

router.route('/').get(protect, getTasks).post(protect, [
    check('text', 'Text is required').not().isEmpty()
], validate, setTask);

router.route('/:id').delete(protect, deleteTask).put(protect, updateTask);

module.exports = router;

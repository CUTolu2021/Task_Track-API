const task = require('../model/task');
const {
    create,
    getAll,
    getById,
    updateById,
    deleteById
} = require('./generic');

module.exports = {
    create: create(task, 'Task'),
    getAll: getAll(task, 'Task'),
    getById: getById(task, 'Task'),
    getByStatus: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const status = req.params.status;
            const data = await task.find({ user: req.user, status });
            res.status(200).json({ message: 'Tasks retrieved successfully', data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    updateById: updateById(task, 'Task'),
    deleteById: deleteById(task, 'Task'),
};
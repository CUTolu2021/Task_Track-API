const {
    getAll,
    getById,
    updateById,
    deleteById
} = require('./generic');

const user = require('../model/user');
const bcrypt = require('bcryptjs');
const { createAuthToken } = require('../middleware/authFunction');

module.exports = {
    createUser: async (req, res) => {
        try {
            const data = await user.create(req.body);
            res.status(201).json({ message: 'User created successfully', data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    getAll: getAll(user, 'User'),
    getById: getById(user, 'User'),
    updateById: updateById(user, 'User'),
    deleteById: deleteById(user, 'User'),
    getAllTaskByUser: async (req, res) => {
        try {
            if (!req.user) {
                return res.status(401).json({ error: 'User not authenticated' });
            }
            const data = await user.findById(req.user).populate('task');
            res.status(200).json({ message: 'Tasks retrieved successfully', data });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    signIn: async (req, res) => {
        try {
            const { email, password } = req.body;
            const User = await user.findOne({ email });
            if (!User) {
                return res.status(401).json({ error: 'User not found' });
            }
            const isPasswordValid = await bcrypt.compare(password, User.password);
            if (!isPasswordValid) {
                return res.status(401).json({ error: 'Invalid password' });
            }
            const token = createAuthToken(User);
    
            console.log(req.user); 
            res.status(200).json({ token });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};
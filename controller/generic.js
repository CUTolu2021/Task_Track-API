const user = require("./user");

const create = (Model, name) => async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ error: 'User not authenticated' });
        }
        const data = await Model.create({ ...req.body, user: req.user });
        res.status(201).json({ message: `${name} created successfully`, data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getAll = (Model, name) => async (req, res) => {
    try {
        const data = await Model.find({user: req.user});
        res.status(200).json({ message: `${name}s retrieved successfully`, data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getById = (Model, name) => async (req, res) => {
    try {
        const data = await Model.findById(req.params.id).populate('task');
        if (!data) {
            return res.status(404).json({ message: `${name} not found` });
        }
        res.status(200).json({ message: `${name} retrieved successfully`, data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const updateById = (Model, name) => async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Model.findByIdAndUpdate(id, req.body, { new: true });
        if (!data) {
            return res.status(404).json({ message: `${name} not found` });
        }
        res.status(200).json({ message: `${name} updated successfully`, data });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const deleteById = (Model, name) => async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Model.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: `${name} not found` });
        }
        res.status(204).json({ message: `${name} deleted successfully` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = {
    create,
    getAll,
    getById,
    updateById,
    deleteById
};
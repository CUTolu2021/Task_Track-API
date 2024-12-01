const bcrypt = require('bcryptjs');

const hashPassword = async (req, res, next) => {
    try {
        const salt = await bcrypt.genSalt(5);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        next();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = hashPassword;
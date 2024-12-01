const jwt = require('jsonwebtoken');

const createAuthToken = (user) => {
    const token = jwt.sign({user: user._id}, process.env.SECRET_KEY, {expiresIn: '30d'});
    console.log("Token from createAuthToken "+token);
    return token;
}

const verifyAuthToken = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        console.log(req.user); 
        next();
    } catch (error) {
        res.status(401).json({ error: 'Unauthorized' });
    }
}

module.exports = { createAuthToken, verifyAuthToken };
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if(!token)
        return res.status(401).json({success: false, message: 'Access token not found'});

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if(!decoded)
            return res.status(401).json({success: false, message: 'Access token not required'})

        req.userId = decoded.userId;
        next();
    } catch (err) {
        console.log(err);
        return res.status(403).json({success: false, message:'Invalid access token'})
    }
}

module.exports = verifyToken;



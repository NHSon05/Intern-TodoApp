const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    /**1. Get token from header request */
    const authHeader = req.headers.authorization;

    /**Check user sending header "authorization" */
    if (!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({message: "Unauthorized: No token provided"})
    }
    /**2. Split token sign (remove Bearer token) */
    const token = authHeader.split(' ')[1];
    
    try {
        /**3. Using. SECRET KEY to check JWT valid */
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        /**4. Decode successfully! Attach payload user into request for next controller */
        req.user = decoded;
        /**5. Open door for going to controller */
        next();
    } catch (error) {
        return res.status(403).json({message: "Forbidden: Invalid token"});
    }
};

module.exports = { verifyToken };
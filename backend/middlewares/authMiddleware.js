import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("JWT Error:", error);

        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Session expired! Please log in again." });
        }
        return res.status(400).json({ message: "Invalid token" });
    }
};

export default authMiddleware;

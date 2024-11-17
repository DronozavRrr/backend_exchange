import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Неавторизован" });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Токен отсутствует" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Ensure req.user is set
        console.log("Authenticated user:", req.user); // Log the authenticated user
        next();
    } catch (e) {
        console.error("Token verification failed:", e); // Log any token verification error
        return res.status(401).json({ message: "Неавторизован" });
    }
};




export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Доступ запрещён" });
    }
    next();
};

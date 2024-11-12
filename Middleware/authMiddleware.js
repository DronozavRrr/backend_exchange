import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Неавторизован" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: "Токен отсутствует" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        console.log("Authenticated user:", req.user); 
        next();
    } catch (e) {
        console.error("Token verification failed:", e);
        return res.status(401).json({ message: "Неавторизован" });
    }
};




export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Доступ запрещён" });
    }
    next();
};

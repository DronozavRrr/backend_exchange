import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Неавторизован" });
    }

    const token = authHeader.split(' ')[1]; // Bearer <token>

    try {
        const decoded = jwt.verify(token,  process.env.JWT_SECRET); 
        req.user = decoded; 
        next();
    } catch (e) {
        return res.status(401).json({ message: "Неавторизован" });
    }
};

export const adminMiddleware = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Доступ запрещён" });
    }
    next();
};

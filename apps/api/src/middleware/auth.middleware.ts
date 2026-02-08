import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';

export interface AuthRequest extends Request {
    user?: any;
}

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err: any, decoded: any) => {
        if (err) return res.sendStatus(403);

        // Normalize the user object
        req.user = {
            id: decoded.sub,      // Standardize as id
            userId: decoded.sub,  // Alias for compatibility
            role: decoded.role,
            ...decoded
        };
        next();
    });
};

export const requireRole = (role: string) => {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};

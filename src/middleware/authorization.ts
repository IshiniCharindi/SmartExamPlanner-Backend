import { NextFunction, Request, Response } from "express";
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken';
import { User } from '../models/user';

dotenv.config()

const JWT_SECRET = process.env.JWT_SECRET || 'your-very-secure-secret-key';
export const COOKIE_NAME = 'auth_token';

export const generateToken = (user: User): string => {
    return jwt.sign(
        { id: user.userId, username: user.username, email: user.email },
        JWT_SECRET,
        { expiresIn: '1d' }
    );
};

export const verifyToken = (token: string): any => {
    return jwt.verify(token, JWT_SECRET);
};


export const authMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.cookies[COOKIE_NAME];
    if (!token) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
    }

    try {
        const decoded = verifyToken(token);
        (req as any).user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

export function authorization(req: Request, res: Response, next: NextFunction) {
    if(process.env.BEARER_TOKEN === req.headers.authorization) next();
    else {
        res.status(401).json({
            proceed: false,
            message: 'unauthorized access detected',
            content: null
        })
    }
}
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import {ObjectId} from "mongoose";


interface TokenPayload {
    userId: ObjectId;
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
        req.user = { userId: decodedToken.userId, role: decodedToken.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized' });
    }

};



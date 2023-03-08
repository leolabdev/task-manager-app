import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
// import {ObjectId} from "mongoose";


interface TokenPayload {
    userId: string;
    role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authorizationHeader = req.headers.authorization;
    const tokenPostman = req.cookies.token;
    let token;

    if (authorizationHeader) {
        token = authorizationHeader.split(' ')[1];
    } else if (tokenPostman) {
        token = tokenPostman;
    } else {
        return res.status(401).json({ message: 'Not authorized' });
    }

    try {
        // @ts-ignore
        const decodedToken = jwt.verify(token , process.env.JWT_SECRET as string) as unknown as TokenPayload;
        req.user = { userId: decodedToken.userId, role: decodedToken.role };
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Not authorized' });
    }

};



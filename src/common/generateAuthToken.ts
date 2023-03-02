import {Request} from "express";
import jwt from "jsonwebtoken";


interface TokenPayload {
    userId: string;
    role: string;
}

// export function generateAuthToken(user: Request["user"], jwtSecret: string) {
export function generateAuthToken(user: TokenPayload, jwtSecret: string) {
    if(!user) throw new Error("User not found");

    return jwt.sign(
        {
            userId: user.userId,
            role: user.role,
        },
        jwtSecret
    );
}

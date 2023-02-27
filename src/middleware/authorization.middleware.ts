import { Request, Response, NextFunction } from 'express';
import {UserRole} from "../user";


// middleware for doing role-based permissions
export default function permit(...permittedRoles: UserRole[]) {
    // return a middleware
    return (req: Request, res: Response, next: NextFunction) => {
        const { user } = req;

        const role = req.user?.role;

        console.log(role)

        if (!role) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        // admin can do anything, so continue on the next middleware
        if(role === UserRole.admin) {
           return next();
        }

        if (user && permittedRoles?.includes(role as UserRole)) {
           return next(); // role is allowed, so continue on the next middleware
        } else {
            return res.status(403).json({message: "Forbidden"}); // user is forbidden
        }
    }
}

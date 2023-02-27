// declare namespace Express {
//     export interface Request {
//         userId?: string;
//     }
// }


declare namespace Express {
    export interface Request {
        user: {
            userId?: string;
            role?: string;
        }
    }
}


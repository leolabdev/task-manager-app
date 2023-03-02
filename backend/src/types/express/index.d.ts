import {ObjectId} from "mongoose";
//
// declare namespace Express {
//     export interface Request {
//         user: {
//             userId?: ObjectId ;
//             role?: string;
//         }
//     }
// }

// import * as express from "express"
declare global {
    namespace Express {
        interface Request {
            user? : {
                userId?: string;
                role?: string;
            }
        }
    }
}

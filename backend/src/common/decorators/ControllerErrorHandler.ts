import {NextFunction,Request,Response} from "express";
import logger from "@/common/logger";
import HttpException from "@/common/http-exception";

/**
 This decorator wraps the controller method with error handling logic
 @param {Object} target - The class or object containing the controller method
 @param {string} propertyKey - The name of the controller method
 @param {Object} descriptor - The PropertyDescriptor of the controller method
 @returns {void}
 */
function ControllerErrorHandler(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    /**

     The wrapped method that contains the error handling logic
     @async
     @function
     @this {Object} - The context of the class or object containing the controller method
     @param {Object} req - The Express Request object
     @param {Object} res - The Express Response object
     @param {Function} next - The next middleware function in the stack
     @throws {HttpException} Throws HttpException if an HttpException instance is caught
     @returns {Promise<void>}
     */
    const wrappedMethod = async function(this: any, req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await originalMethod.call(this, req, res, next);
        } catch (error: unknown) {
            logger.error(error);
            if (error instanceof HttpException) {
                if (error.status != null) {
                    res.status(error.status).json({message: error.message});
                }
            } else {
                res.status(500).json({ message: 'Internal Server Error' });
            }
            next(error);
        }
    };

    descriptor.value = wrappedMethod;
}

export default ControllerErrorHandler;

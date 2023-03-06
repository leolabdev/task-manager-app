import {validateGetAllPaginationQuery} from "@/common/validation/validateGetAllPaginationQuery";
import {NextFunction,Request,Response} from "express";
import HttpException from "@/common/http-exception";

/**
 * Create a handler function to get all items.
 * @param {object} service - The service to use for getting all items.
 * @param {Function} logger - The logger function to use for logging errors.
 * @returns {Function} A handler function that can be used to get all items.
 */
export function createGetAllHandler(service: any, logger: any): (req: Request, res: Response, next: NextFunction) => Promise<void> {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = validateGetAllPaginationQuery(req.query);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const { page = 1, limit = 10 } = value;
            const data = await service.getAll(Number(page), Number(limit));


            if (!data) {
                throw new HttpException(404, "Data not found");
            }

            res.status(200).json(data);
        } catch (error: unknown) {

            logger(error);

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
}

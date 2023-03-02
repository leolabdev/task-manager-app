import {NextFunction, Request, Response} from 'express'
import logger from '@/common/logger'
import {IUserWithoutPassword} from "./User/user";
import HttpException from "@/common/http-exception";
import {
    getUserByUsernameValidation,
    updateUserValidation
} from "./helpers/userValidation";
import {UserService} from "./user.service";
import {validateGetAllPaginationQuery} from "@/common/validation/validateGetAllPaginationQuery";
import {validateMongoId} from "@/common/validation/validateMongoId";
import {hashPassword} from "@/common/hashPassword";
import {generateAuthToken} from "@/common/generateAuthToken";
import {CookieEnum} from "@/types/cookie-enums";
import {UserRole} from "@/user/User/userRole";



export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    getAll =  async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {

        try {
            const { error, value } = validateGetAllPaginationQuery(req.query);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }
            const { page = 1, limit = 10 } = value;
            const users = await this.userService.getAll(Number(page), Number(limit));
            res.status(200).json(users);

        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    getCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req?.user?.userId;

            if (!userId) throw new Error('User id not found in request (getCurrentUser)');

            const user = await this.userService.getById(userId);

            if (!user) throw new HttpException(404, 'User not found');

            const userWithoutPassword: IUserWithoutPassword = {
                id: user.id,
                username: user.username,
                tasks: user.tasks,
                taskCategories: user.taskCategories,
                role: user.role as UserRole,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };

            res.status(200).json(userWithoutPassword);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };


    // postNew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const { error, value } = createUserValidation(req.body);
    //
    //         if (error) {
    //             throw new HttpException(400, `Invalid input: ${error.message}`);
    //         }
    //
    //         const data: IUser | MongoError = await this.userService.createNew(value);
    //         if (data instanceof MongoError) {
    //             if (data.code === 11000) {
    //                 throw new HttpException(422, 'IUser already exists');
    //             }
    //         }
    //         if (isUser(data)) {
    //             res.status(200).json(data);
    //         } else {
    //             throw new Error('Unexpected response from the server');
    //         }
    //     } catch (e: unknown) {
    //         logger.error(e);
    //         next(e);
    //     }
    // }

    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;

            const {error} = validateMongoId(id);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const user = await this.userService.getById(id);

            if (!user) {
                throw new HttpException(404, 'User not found');
            }

            res.status(200).json(user);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    getByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const username = req.params.username;

            const { error } = getUserByUsernameValidation(username);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const user = await this.userService.getByUserName(username);

            if (!user) {
                throw new HttpException(404, 'User not found');
            }

            const userWithoutPassword: IUserWithoutPassword = {
                id: user.id,
                username: user.username,
                tasks: user.tasks,
                taskCategories: user.taskCategories,
                role: user.role as UserRole,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            };

            res.status(200).json(userWithoutPassword);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    /**
     * Update user by saved id in request(cookie)
     * @param req
     * @param res
     * @param next
     */
    updateCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = updateUserValidation(req.body);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const userId = req?.user?.userId;

            if(!userId) throw new Error('User id not found in request (updateCurrentUser)')

            // const { userId } = req.user;
            const userToUpdate = await this.userService.getById(userId);
            if (!userToUpdate) {
                throw new HttpException(404, 'User not found');
            }

            const password = value.password;

            // Hash password if it's included in the request body
            if (password) {
                value.password =  await hashPassword(password);
            }

            const userBody = {...value, id: userId};

            const updatedUser = await this.userService.updateUser(userBody);
            res.status(200).json(updatedUser);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    /** todo if we update the user role , how we can update the token without needing him to relogin ?
     * Update user by id from request params(admin)
     * @param req
     * @param res
     * @param next
     */
    updateUserById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = updateUserValidation(req.body);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const { id } = req.params;

            if(!id) throw new Error('User id not found in request (updateUserById)');

            const userToUpdate = await this.userService.getById(id);
            if (!userToUpdate) {
                throw new HttpException(404, 'User not found');
            }

            const password = value.password;

            // Hash password if it's included in the request body
            if (password) {
                value.password =  await hashPassword(password);
            }

            const userBody = {...value, id};

            const updatedUser = await this.userService.updateUser(userBody);

            // Check if the user role has changed
            if (value.role !== userToUpdate.role) {
                // Generate a new JWT with the updated user role
                const newToken = generateAuthToken({userId: id, role: value.role}, process.env.JWT_SECRET as string);
                res.cookie(CookieEnum.token, newToken, { httpOnly: true , maxAge: Number(process.env.JWT_MAX_AGE)});
            }

            res.status(200).json(updatedUser);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;

            const { error } = validateMongoId(id);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const user = await this.userService.getById(id);

            if (!user) {
                throw new HttpException(404, 'User not found');
            }

            if (req.user && req.user.userId !== user.id && req.user.role !== UserRole.admin) {
                throw new HttpException(403, 'Not authorized to delete this user');
            }

            await this.userService.deleteUser(id);

            res.status(204).send();
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };


    deleteCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId = req?.user?.userId;

            if(!userId) throw new Error('User id not found in request (deleteCurrentUser)');

            const userToDelete = await this.userService.getById(userId);

            if (!userToDelete) throw new HttpException(404, 'User not found');

            const deletedUser = await this.userService.deleteUser(userId);

            if (!deletedUser) throw new HttpException(404, 'User not found');

            res.clearCookie(CookieEnum.token);

            res.status(200).json(deletedUser);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };


}




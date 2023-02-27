import {NextFunction, Request, Response} from 'express'

import logger from '../common/logger'
import {ITask, ICreateTask, IUpdateTask} from "./Task/task";
import HttpException from "../common/http-exception";
import {MongoError} from "mongodb";
import {createTaskValidation, updateTaskValidation} from "./helpers/taskValidation";
import {TaskService} from "./task.service";
import {isTask} from "./helpers/isTask";
import {validateGetAllPaginationQuery} from "../common/validation/validateGetAllPaginationQuery";



export class TaskController {
    private userService: TaskService;

    constructor() {
        this.userService = new TaskService();
    }

    getAllTasks =  async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {

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


    postNew = async (req: Request<ICreateTask>, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { error, value } = createTaskValidation(req.body);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const data: ITask | MongoError = await this.userService.postNew(value);
            if (data instanceof MongoError && data.code === 11000) {
                if (data.code === 11000) {
                    throw new HttpException(422, 'IUser already exists');
                }
            }
            if (isTask(data)) {
                res.status(200).json(data);
            } else {
                throw new Error('Unexpected response from the server');
            }
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    }

    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;
            const user = await this.userService.getById(id);

            if (!user) {
                throw new HttpException(404, 'Task not found');
            }

            res.status(200).json(user);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    // getByUsername = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const username = req.params.username;
    //         const user = await this.userService.getByUserName(username);
    //
    //         if (!user) {
    //             throw new HttpException(404, 'Task not found');
    //         }
    //
    //         res.status(200).json(user);
    //     } catch (e: unknown) {
    //         logger.error(e);
    //         next(e);
    //     }
    // };
    //
    //
    // update = async (req: Request<IUpdateUser>, res: Response, next: NextFunction): Promise<void> => {
    //     try {
    //         const { error, value } = updateUserValidation(req.body);
    //
    //         if (error) {
    //             throw new HttpException(400, `Invalid input: ${error.message}`);
    //         }
    //
    //         const { id } = req.params;
    //         const userToUpdate = await this.userService.getById(id);
    //         if (!userToUpdate) {
    //             throw new HttpException(404, 'Task not found');
    //         }
    //
    //         const updatedUser = await this.userService.updateUser(id, value);
    //         res.status(200).json(updatedUser);
    //     } catch (e: unknown) {
    //         logger.error(e);
    //         next(e);
    //     }
    // };


}




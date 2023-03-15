import {NextFunction, Request, Response} from 'express'
import logger from '@/common/logger'
import HttpException from "@/common/http-exception";
import {TaskService} from "./task.service";
import {createGetAllHandler} from "@/common/factories/createGetAllHandlerFactory";
import {validateMongoId} from "@/common/validation/validateMongoId";
import {ICreateTask, ITask} from "@/task/Task/task";
import {createTaskValidation, updateTaskValidation} from "@/task/helpers/taskValidation";
import {MongoError} from "mongodb";
import {isTask} from "@/task/helpers/isTask";
import {TaskCategoryService} from "../taskCategory/taskCategory.service";



export class TaskController {
    private readonly taskService: TaskService;
    private readonly taskCategoryService: TaskCategoryService;

    constructor(taskCategoryService: TaskCategoryService) {
        this.taskCategoryService = taskCategoryService;
        this.taskService = new TaskService();

    }

    // admin
    // todo implement factories for all methods
    getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const getAllHandler = createGetAllHandler(this.taskService, (e: unknown) => logger.error(e));
        await  getAllHandler(req, res, next);
    }

    // admin
    getAllTasksByUserId =  async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
        try {
            const userId = req.params.id;

            const {error} = validateMongoId(userId);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const tasks = await this.taskService.getAllRelatedToUser(userId);

            if (!tasks) {
                throw new HttpException(404, 'Tasks not found');
            }

            res.status(200).json(tasks);

        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    // works with auth middleware
    getAllTasksByCurrentUser =  async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
        try {

            const userId = req?.user?.userId;

            if (!userId) throw new HttpException(400, 'User id not found in request');

            const tasks = await this.taskService.getAllRelatedToUser(userId);

            if (tasks.length === 0) {
                throw new HttpException(404, 'Tasks not found');
            }

            // Check permission to access the task
            tasks.forEach((task) => {
                // @ts-ignore
                if (task.user._id.toString() !== userId) {
                    throw new HttpException(403, 'You do not have permission to access this task');
                }
            });

            res.status(200).json(tasks);

        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    // admin
    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;
            const user = await this.taskService.getById(id);

            if (!user) {
                throw new HttpException(404, 'Task not found');
            }

            res.status(200).json(user);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };

    // works with auth middleware
    getByIdAndCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const taskId = req.params.id;
            const userId = req?.user?.userId;
            if (!userId) throw new HttpException(400, 'User id not found in request');
            const task = await this.taskService.getById(taskId);
            if (!task) {
                throw new HttpException(404, 'Task not found');
            }
            // @ts-ignore
            if (task.user._id.toString() !== userId) {
                throw new HttpException(403, 'You do not have permission to access this task');
            }
            res.status(200).json(task);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    }

    // works with auth middleware
    createNewByCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            const user = req?.user?.userId;
            if (!user) throw new HttpException(400, 'User id not found in request');

            const newTaskCategory:ICreateTask =  {...req.body, user}

            const { error } = createTaskValidation(newTaskCategory);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const categoryExists = await this.taskCategoryService.getById(newTaskCategory.taskCategory.toString());
            if (!categoryExists) {
                throw new HttpException(404, 'Category does not exist');
            }

            const data: ITask | MongoError = await this.taskService.createNew(newTaskCategory);
            if (data instanceof MongoError && data.code === 11000) {
                if (data.code === 11000) {
                    throw new HttpException(422, 'Task already exists');
                }
            }
            if (isTask(data)) {
                res.status(201).json(data);
            } else {
                throw new Error('Unexpected response from the server');
            }
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    }

    updateByCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const taskCategoryId = req.params.id;

            const userId = req?.user?.userId;
            if (!userId) throw new Error('User id not found in request (taskCategory->updateByCurrentUser)');

            const taskBody = { ...req.body, _id: taskCategoryId}

            const { error, value } = updateTaskValidation(taskBody);
            if (error) throw new HttpException(400, `Invalid input: ${error.message}`);

            const newCategoryExists = await this.taskCategoryService.getById(taskBody.taskCategory.toString());
            if (!newCategoryExists) {
                throw new HttpException(404, 'New Category does not exist');
            }

            // const updatedTask = await this.taskService.update({taskCategoryName: value.taskCategoryName, _id: value?._id});
            const updatedTask = await this.taskService.update(taskBody);
            if (!updatedTask) throw new HttpException(404, 'Task category not found');

            res.status(200).json(updatedTask);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };



    deleteByCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const taskId = req.params.id;
            const userId = req?.user?.userId;

            if (!userId) throw new HttpException(400, 'User id not found in request');

            const { error } = validateMongoId(taskId);
            if (error) throw new HttpException(400, `Invalid id: ${error.message}`);

            const task = await this.taskService.getById(taskId);

            if (!task) throw new HttpException(404, 'Task  not found');

            // @ts-ignore
            if (task.user._id.toString() !== userId ) {
                throw new HttpException(403, 'You do not have permission to delete this task');
            }

            const deletedTaskCategory = await this.taskService.deleteById(taskId);

            if (!deletedTaskCategory) throw new HttpException(404, 'Task category not found');

            res.status(204).end();
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };


}




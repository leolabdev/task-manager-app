import { NextFunction, Request, Response } from 'express';
import { MongoError } from 'mongodb';
import HttpException from '@/common/http-exception';
import logger from '@/common/logger';
import { validateMongoId } from '@/common/validation/validateMongoId';
import { validateGetAllPaginationQuery } from '@/common/validation/validateGetAllPaginationQuery';
import { TaskCategoryService } from './taskCategory.service';
import { isTaskCategory } from '@/taskCategory/helpers/isTaskCategory';
import {
    createTaskCategoryValidation,
    updateTaskCategoryValidation,
} from '@/taskCategory/helpers/taskCategoryValidation';
import {
    ICreateTaskCategory,
    ICreateTaskCategoryWithUserId,
    ITaskCategory,
} from '@/taskCategory/TaskCategory/taskCategory';
import {error} from "winston";
import {createGetAllHandler} from "@/common/factories/createGetAllHandlerFactory";
import {TaskService} from "@/task";




export class TaskCategoryController {
    private readonly taskCategoryService: TaskCategoryService;


    constructor() {
        this.taskCategoryService = new TaskCategoryService(new TaskService());
    }


    getAllTaskCategories = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const getAllHandler = createGetAllHandler(this.taskCategoryService, (e: unknown) => logger.error(e));
        await  getAllHandler(req, res, next);
    }


    getAllTaskCategoriesByUserId =  async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
        try {

            const userId = req.params.id;

            const {error} = validateMongoId(userId);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const taskCategories = await this.taskCategoryService.getAllRelatedToUser(userId);

            if (!taskCategories) {
                throw new HttpException(404, 'TaskCategories not found');
            }

            res.status(200).json(taskCategories);

        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };


    getAllTaskCategoriesByCurrentUser =  async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
        try {

            const userId = req?.user?.userId;

            if (!userId) throw new HttpException(400, 'User id not found in request');

            const taskCategories = await this.taskCategoryService.getAllRelatedToUser(userId);

            if (taskCategories.length === 0) {
                throw new HttpException(404, 'TaskCategories not found');
            }

            // Check permission to access the task
            taskCategories.forEach((taskCategory) => {
                // @ts-ignore
                if (taskCategory.user._id.toString() !== userId) {
                    throw new HttpException(403, 'You do not have permission to access this task');
                }
            });

            res.status(200).json(taskCategories);

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
            const taskCategory = await this.taskCategoryService.getById(taskId);
            if (!taskCategory) {
                throw new HttpException(404, 'Task category not found');
            }
            // @ts-ignore
            if (taskCategory.user._id.toString() !== userId) {
                throw new HttpException(403, 'You do not have permission to access this task category');
            }
            res.status(200).json(taskCategory);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    }


    getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const taskId = req.params.id;
            const taskCategory = await this.taskCategoryService.getById(taskId);

            if (!taskCategory) {
                throw new HttpException(404, 'Task category not found');
            }

            res.status(200).json(taskCategory);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };



    createNew = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {

            const userId = req.params.userId;

            if (!userId) throw new HttpException(400, 'User id not found in request');

            const newTaskCategory:ICreateTaskCategoryWithUserId =  {...req.body, user: userId}

            const { error, value } = createTaskCategoryValidation(newTaskCategory);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const data: ITaskCategory | MongoError = await this.taskCategoryService.createNew(value);
            if (data instanceof MongoError && data.code === 11000) {
                if (data.code === 11000) {
                    throw new HttpException(422, 'Task category already exists');
                }
            }
            if (isTaskCategory(data)) {
                res.status(201).json(data);
            } else {
                throw new Error('Unexpected response from the server');
            }
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    }



    createNewByCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {

        try {
            const user = req?.user?.userId;
            if (!user) throw new HttpException(400, 'User id not found in request');

            const newTaskCategory:ICreateTaskCategoryWithUserId =  {...req.body, user}

            const { error } = createTaskCategoryValidation(newTaskCategory);

            if (error) {
                throw new HttpException(400, `Invalid input: ${error.message}`);
            }

            const data: ITaskCategory | MongoError = await this.taskCategoryService.createNew(newTaskCategory);
            if (data instanceof MongoError && data.code === 11000) {
                if (data.code === 11000) {
                    throw new HttpException(422, 'Task category already exists');
                }
            }
            if (isTaskCategory(data)) {
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

            const taskCategoryBody = { ...req.body, _id: taskCategoryId}


            const { error, value } = updateTaskCategoryValidation(taskCategoryBody);
            if (error) throw new HttpException(400, `Invalid input: ${error.message}`);

            const updatedTaskCategory = await this.taskCategoryService.update({taskCategoryName: value.taskCategoryName, _id: value?._id});
            if (!updatedTaskCategory) throw new HttpException(404, 'Task category not found');

            res.status(200).json(updatedTaskCategory);
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };




    deleteById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const id = req.params.id;
            const deletedTaskCategory = await this.taskCategoryService.deleteTaskCategoryById(id);

            if (!deletedTaskCategory) {
                throw new HttpException(404, 'Task category not found');
            }

            res.status(204).end();
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };



    deleteByCurrentUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {

            const taskCategoryId = req.params.id;
            const userId = req?.user?.userId;

            if (!userId) throw new HttpException(400, 'User id not found in request');

            const { error } = validateMongoId(taskCategoryId);
            if (error) throw new HttpException(400, `Invalid id: ${error.message}`);

            const taskCategory = await this.taskCategoryService.getById(taskCategoryId);

            if (!taskCategory) throw new HttpException(404, 'Task category not found');

            // @ts-ignore
            if (taskCategory.user._id.toString() !== userId ) {
                throw new HttpException(403, 'You do not have permission to delete this task category');
            }

            const deletedTaskCategory = await this.taskCategoryService.deleteTaskCategoryById(taskCategoryId);

            if (!deletedTaskCategory) throw new HttpException(404, 'Task category not found');

            res.status(204).end();
        } catch (e: unknown) {
            logger.error(e);
            next(e);
        }
    };




}




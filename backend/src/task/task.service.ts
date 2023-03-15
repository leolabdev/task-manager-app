import {ICreateTask, IUpdateTask, ITask} from "./Task/task";
import {TaskModel} from "./Task/task.model";
import {DeleteResult, MongoError} from "mongodb";
import {ObjectId} from "mongoose";
import {TaskCategoryModel} from "@/taskCategory/TaskCategory/taskCategory.model";
import {ITaskCategory, IUpdateTaskCategory} from "@/taskCategory/TaskCategory/taskCategory";




export class TaskService {


    getAllByUserName = async (username: string): Promise<ITask | null> =>  {
        try {
            // todo find all tasks related to user
            return await TaskModel.findOne({username})
                .populate({
                    path: 'taskCategory',
                    select: '-tasks -__v -user',
                })
                .populate({
                    path: "user",
                    select: "-password -__v -taskCategories -tasks",
                })
                .exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by username: ${error.message}`);
            }
            throw new Error(`Error getting user by username: ${error}`);
        }
    }


   getById = async (id: string): Promise<ITask | null> =>  {

    try {
      return await TaskModel.findById(id)
          .populate({
          path: 'taskCategory',
          select: '-tasks -__v -user',
      })
          .populate({
              path: "user",
              select: "-password -__v -taskCategories -tasks -createdAt -updatedAt",
          })
          .exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error getting user by ID: ${error.message}`);
      }
      throw new Error(`Error getting user by ID: ${error}`);
    }
  }

    getAll = async (page = 1, limit = 10): Promise<ITask[]> =>{
        try {
            const skipCount = (page - 1) * limit;
            return await TaskModel.find().skip(skipCount).limit(limit)
                .populate({
                    path: 'taskCategory',
                    select: '-tasks -__v -user',
                })
                .populate({
                    path: "user",
                    select: "-password -__v -taskCategories -tasks",
                })
                .exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
            throw new Error(`Error getting all users: ${error}`);
        }
    }

    getAllRelatedToUser = async (userId: string): Promise<ITask[]> =>{
        try {
            return await TaskModel.find({ user: userId })
                .populate({
                    path: 'taskCategory',
                    select: '-tasks -__v -user',
                })
                .populate({
                    path: "user",
                    select: "-password -__v -taskCategories -tasks",
                })
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting all tasks: ${error.message}`);
            }
            throw new Error(`Error getting all tasks: ${error}`);
        }
    }


    createNew = async (taskData: ICreateTask): Promise<ITask> => {
        try {
            const task = new TaskModel(taskData);
            return await task.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error creating task: ${error.message}`);
            }
            throw new Error(`Error creating task: ${error}`);
        }
    };


    update = async (taskBody: IUpdateTask): Promise<ITaskCategory | null> => {
        try {
            const {taskCategory,description,priority,title,deadlineTime, _id} = taskBody;

            // return await TaskModel.findOneAndUpdate(
            return TaskModel.findOneAndUpdate(
            {_id},
                {
                    taskCategory: taskCategory ?? undefined,
                    description: description ?? undefined,
                    priority: priority ?? undefined,
                    title: title ?? undefined,
                    deadlineTime: deadlineTime ?? undefined,
                },
                // {new: true},
                {new: true},
            )
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by ID: ${error.message}`);
            }
            throw new Error(`Error getting user by ID: ${error}`);
        }
    }



   deleteById = async (id: string): Promise<ITask | null> => {
    try {
        const task = await TaskModel.findById(id);

        if (!task) {
            return null;
        }
        // Remove the task  document and trigger the pre middleware hook to update the users and taskCategories arrays
        await task.remove();

        return task;

      // return await TaskModel.findOneAndDelete({ _id: id }).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
      throw new Error(`Error deleting user: ${error}`);
    }
  }



    deleteAllTasksByTaskCategory = async (
        taskCategoryId: string,
    ): Promise<DeleteResult> => {
        try {
            return await TaskModel.deleteMany({ taskCategory: taskCategoryId }).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error deleting tasks by task category: ${error.message}`);
            }
            throw new Error(`Error deleting tasks by task category: ${error}`);
        }
    };

    deleteAllTasksByUser = async (userId: string): Promise<DeleteResult> => {
        try {
            return await TaskModel.deleteMany({ user: userId }).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error deleting tasks by user: ${error.message}`);
            }
            throw new Error(`Error deleting tasks by user: ${error}`);
        }
    };



}


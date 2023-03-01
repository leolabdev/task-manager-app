import {ICreateTask, IUpdateTask, ITask} from "./Task/task";
import {TaskModel} from "./Task/task.model";
import {DeleteResult, MongoError} from "mongodb";
import {ObjectId} from "mongoose";




export class TaskService {


    getByUserName = async (username: string): Promise<ITask | null> =>  {
        try {
            return await TaskModel.findOne({username}).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by username: ${error.message}`);
            }
            throw new Error(`Error getting user by username: ${error}`);
        }
    }


   getById = async (id: ObjectId): Promise<ITask | null> =>  {

    try {
      return await TaskModel.findById(id).exec();
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
      return await TaskModel.find().skip(skipCount).limit(limit).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error getting all users: ${error.message}`);
      }
      throw new Error(`Error getting all users: ${error}`);
    }
  }

  //  createNew = async (userBody: ICreateTask): Promise<ITask | MongoError> =>{
  //   try {
  //     const { username, password } = userBody;
  //
  //     const newUser = new TaskModel<ICreateTask>({
  //       username,
  //       password
  //     });
  //     return await newUser.save();
  //   } catch (error) {
  //     if (error instanceof MongoError) {
  //       return error;
  //     }
  //     throw new Error(`Error saving user data: ${error}`);
  //   }
  // }
  //
  //  updateUser = async (id: string, userBody: IUpdateTask): Promise<ITask | null> =>{
  //   try {
  //     const { username, password } = userBody;
  //     return await TaskModel.findByIdAndUpdate(id, { username, password }, { new: true }).exec();
  //   } catch (error: unknown) {
  //     if (error instanceof Error) {
  //       throw new Error(`Error updating user: ${error.message}`);
  //     }
  //     throw new Error(`Error updating user: ${error}`);
  //   }
  // }

   deleteTaskById = async (id: ObjectId): Promise<ITask | null> => {
    try {
      return await TaskModel.findByIdAndDelete(id).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
      throw new Error(`Error deleting user: ${error}`);
    }
  }

    deleteAllTasksByTaskCategory = async (
        taskCategoryId: ObjectId,
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

    deleteAllTasksByUser = async (userId: ObjectId): Promise<DeleteResult> => {
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


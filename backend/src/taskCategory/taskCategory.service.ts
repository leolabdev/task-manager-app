import {
    ICreateTaskCategory,
    ICreateTaskCategoryWithUserId,
    ITaskCategory,
    IUpdateTaskCategory
} from "./TaskCategory/taskCategory";
import {TaskCategoryModel} from "./TaskCategory/taskCategory.model";
import {DeleteResult} from "mongodb";
import {TaskService} from "@/task";


export class TaskCategoryService{

    private taskService: TaskService;

    constructor(taskService: TaskService) {
        this.taskService = taskService;
    }

    getAll = async (page = 1, limit = 10): Promise<ITaskCategory[]> =>{
        try {

            const skipCount = (page - 1) * limit;
            return await TaskCategoryModel.find()
                .populate({
                    path: "user",
                    select: "-password",
                })
                .populate('tasks')
                .skip(skipCount).
                limit(limit).
                exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
            throw new Error(`Error getting all users: ${error}`);
        }
    }

    getAllRelatedToUser = async (userId: string): Promise<ITaskCategory[]> =>{
        try {
            return await TaskCategoryModel.find({ user: userId })
                .populate({path : "tasks", select: "-taskCategory -user -createdAt -updatedAt -__v"})
                .populate({
                path: "user",
                select: "-password -taskCategories -tasks -createdAt -updatedAt -__v"
            });
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting all users: ${error.message}`);
            }
            throw new Error(`Error getting all users: ${error}`);
        }
    }

    getById = async (id: string): Promise<ITaskCategory | null> =>  {

            try {
                return await TaskCategoryModel.findById(id)
                    // .populate('tasks')
                    .populate({path: "tasks" , select: "-taskCategory -user -createdAt -updatedAt -__v"})
                    .populate({ path: "user", select: "-password -taskCategories -tasks -createdAt -updatedAt -__v" });
            } catch (error: unknown) {
                if (error instanceof Error) {
                    throw new Error(`Error getting user by ID: ${error.message}`);
                }
                throw new Error(`Error getting user by ID: ${error}`);
            }
    }

    createNew = async (taskCategoryBody: ICreateTaskCategoryWithUserId): Promise<ITaskCategory> =>{
        try {
            const { taskCategoryName, user } = taskCategoryBody;

            const newTaskCategory = new TaskCategoryModel<ICreateTaskCategoryWithUserId>({
                taskCategoryName,
                user,
            });
            return await newTaskCategory.save();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by ID: ${error.message}`);
            }
            throw new Error(`Error getting user by ID: ${error}`);
        }
    }


    update = async (taskCategoryBody: IUpdateTaskCategory): Promise<ITaskCategory | null> => {
        try {
            const {taskCategoryName, _id} = taskCategoryBody;

            return await TaskCategoryModel.findByIdAndUpdate(
                _id,
                {taskCategoryName},
                {new: false},
            ).populate('tasks');
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by ID: ${error.message}`);
            }
            throw new Error(`Error getting user by ID: ${error}`);
        }
    }

    deleteTaskCategoryById = async (id: string): Promise<ITaskCategory | null> => {
        try {
            // return await TaskCategoryModel.findByIdAndDelete(id);

            const taskCategory = await TaskCategoryModel.findById(id);

            if (!taskCategory) {
                return null;
            }
            // Remove the task category document and trigger the pre middleware hook to update the user document's taskCategories array
            await taskCategory.remove();

            return taskCategory;

        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by ID: ${error.message}`);
            }
            throw new Error(`Error getting user by ID: ${error}`);
        }
    }

    deleteAllTaskCategoriesAndTasksByUser = async (userId: string): Promise<DeleteResult> => {
        try {
            // Find all task categories belonging to the user
            // const taskCategories = await TaskCategoryModel.find({ user: userId }).exec();
            const taskCategories = await this.getAllRelatedToUser(userId);

            // Loop through each task category and delete its tasks
            for (const taskCategory of taskCategories) {
                await this.taskService.deleteAllTasksByTaskCategory(taskCategory._id as unknown as string);
            }

            // Delete all task categories belonging to the user
            return await TaskCategoryModel.deleteMany({ user: userId }).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error deleting task categories: ${error.message}`);
            }
            throw new Error(`Error deleting task categories: ${error}`);
        }
    };



}

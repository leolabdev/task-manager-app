import {ICategory} from "@/entities/Category";
import {TaskPriority} from "@/entities/Task";

export interface UpdateTaskSchema{
  title: string,
  description?: string
  taskCategory: {
    _id: string,
    taskCategoryName: string,
  }
  deadlineTime: string
  priority: TaskPriority
  isLoading?: boolean,
  error?: string;
}

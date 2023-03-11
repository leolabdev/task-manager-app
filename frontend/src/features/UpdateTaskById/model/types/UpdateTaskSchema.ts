import {TaskPriority} from "@/entities/Task";

export interface UpdateTaskSchema {
  _id?: string;
  title: string;
  description?: string;
  taskCategory?: string;
  deadlineTime: string;
  priority: TaskPriority;
}

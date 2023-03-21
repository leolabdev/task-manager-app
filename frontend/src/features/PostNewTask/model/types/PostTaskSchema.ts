import {TaskPriority} from "@/entities/Task";

export interface PostTaskSchema {
  title: string;
  description?: string;
  taskCategory?: string;
  deadlineTime: string;
  priority: TaskPriority;
}

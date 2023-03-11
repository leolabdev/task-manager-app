import { ICategory } from "@/entities/Category";
import { TaskPriority } from "@/entities/Task";

export const createCategory = (): ICategory => ({
    _id: "mock-category-id",
    taskCategoryName: "Mock Category",
    tasks: [
        {
            _id: "mock-task-id-1",
            title: "Mock Task 1",
            description: "This is a mock task.",
            taskCategory: {
                _id: "mock-category-id",
                taskCategoryName: "Mock Category",
            },
            user: "mock-user-id",
            deadlineTime: "2021-01-01T00:00:00.000Z",
            priority: TaskPriority.low,
        },
        {
            _id: "mock-task-id-2",
            title: "Mock Task 2",
            description: "This is another mock task.2",
            taskCategory: {
                _id: "mock-category-id2",
                taskCategoryName: "Mock Category2",
            },
            user: "mock-user-id2",
            deadlineTime: "2021-01-02T00:00:00.000Z",
            priority: TaskPriority.medium,
        },
        {
            _id: "mock-task-id-3",
            title: "Mock Task 3",
            description: "This is another mock task.3",
            taskCategory: {
                _id: "mock-category-id3",
                taskCategoryName: "Mock Category3",
            },
            user: "mock-user-id3",
            deadlineTime: "2021-01-02T00:00:00.000Z",
            priority: TaskPriority.high,
        },
    ],
    user: "mock-user-id",
});



import {ITaskCategory} from "../TaskCategory/taskCategory";

export  function isTask(value: unknown): value is ITaskCategory {
    return typeof value === 'object'
        && value !== null
        // && '_id' in value
        && 'taskCategoryName' in value
        && 'user' in value
}



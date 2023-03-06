import {ITask} from "../Task/task";

export  function isTask(value: unknown): value is ITask {
    return typeof value === 'object'
        && value !== null
        // && '_id' in value
        && 'title' in value
        && 'taskCategory' in value
        && 'priority' in value
        && 'deadlineTime' in value;
}

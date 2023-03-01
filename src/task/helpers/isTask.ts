// import {ITask} from "../../user/User/user";
import {ITask} from "../Task/task";

export  function isTask(value: unknown): value is ITask {
    return typeof value === 'object'
        && value !== null
        // && '_id' in value
        && 'title' in value
        && 'category' in value
        && 'priority' in value
        && 'deadlineTime' in value;
}

import {IUser} from "../../user/User/user";

export  function isUser(value: unknown): value is IUser {
    return typeof value === 'object'
        && value !== null
        // && '_id' in value
        && 'username' in value
        && 'password' in value;
}

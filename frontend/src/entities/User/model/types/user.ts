export enum UserRole {
    basic = 'basic',
    moderator = 'moderator',
    admin = 'admin'
}

export interface User {
    _id: string;
    username: string;
    role: string;
    tasks?: Object[];
    taskCategories?: Object[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserSchema {
    authData?: User;
}

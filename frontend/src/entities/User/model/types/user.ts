export enum UserRole {
    basic = 'basic',
    moderator = 'moderator',
    admin = 'admin'
}

export interface User {
    _id: string;
    username: string;
    role: string;
    createdAt?: Date;
}


export interface UserSchema {
    token?: string;
    user?: User;
}

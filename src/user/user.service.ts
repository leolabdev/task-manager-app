import {ICreateUser, IUpdateUser, IUser} from "./User/user";
import {UserModel} from "./User/user.model";
import {MongoError} from "mongodb";


export class UserService {

    getByUserName = async (username: string): Promise<IUser | null> =>  {
        try {
            return await UserModel.findOne({username}).exec();
        } catch (error: unknown) {
            if (error instanceof Error) {
                throw new Error(`Error getting user by username: ${error.message}`);
            }
            throw new Error(`Error getting user by username: ${error}`);
        }
    }


   getById = async (id: string): Promise<IUser | null> =>  {

    try {
      return await UserModel.findById(id).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error getting user by ID: ${error.message}`);
      }
      throw new Error(`Error getting user by ID: ${error}`);
    }
  }

  getAll = async (page = 1, limit = 10): Promise<IUser[]> =>{
    try {
      const skipCount = (page - 1) * limit;
      return await UserModel.find().skip(skipCount).limit(limit).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error getting all users: ${error.message}`);
      }
      throw new Error(`Error getting all users: ${error}`);
    }
  }

   postNew = async (userBody: ICreateUser): Promise<IUser | MongoError> =>{
    try {
      const { username, password } = userBody;

      const newUser = new UserModel<ICreateUser>({
        username,
        password
      });
      return await newUser.save();
    } catch (error) {
      if (error instanceof MongoError) {
        return error;
      }
      throw new Error(`Error saving user data: ${error}`);
    }
  }

   updateUser = async (id: string, userBody: IUpdateUser): Promise<IUser | null> =>{
    try {
      const { username, password } = userBody;
      return await UserModel.findByIdAndUpdate(id, { username, password }, { new: true }).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error updating user: ${error.message}`);
      }
      throw new Error(`Error updating user: ${error}`);
    }
  }

   deleteUser = async (id: string): Promise<IUser | null> => {
    try {
      return await UserModel.findByIdAndDelete(id).exec();
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error deleting user: ${error.message}`);
      }
      throw new Error(`Error deleting user: ${error}`);
    }
  }
}


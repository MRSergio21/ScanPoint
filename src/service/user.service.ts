import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model";

const insertUser = async (user: User) => {
    const resposeInsert = await UserModel.create(user);
    return resposeInsert;
};

const obtenerUser = async (id: string) => {
    const responseUser = await UserModel.findOne({_id:id});
    return responseUser;
};

export { insertUser, obtenerUser };
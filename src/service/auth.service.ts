import { User } from "../interfaces/user.interface"
import UserModel from "../models/user.model"
import { encrypt, verified } from "../utils/password.handle";

const registerNewUser = async ({ user, email, password }: User) => {
    const checkIs = await UserModel.findOne({ email });
    if(checkIs) return "Already used";
    const passHash = await encrypt(password);
    const registerNewUser = await UserModel.create({ user, email, password: passHash })
    return registerNewUser;
}

const loginUser = async ({ email, password }: User) => {
    const checkIs = await UserModel.findOne({ email });
    if(!checkIs) return "Not found user";

    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);

    if(!isCorrect) return "Password incorrect";
    return checkIs;
}

export { registerNewUser, loginUser }
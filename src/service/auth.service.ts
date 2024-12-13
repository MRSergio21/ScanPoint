import { User } from "../interfaces/user.interface"
import UserModel from "../models/user.model"
import { generateToken } from "../utils/jwt.handle";
import { encrypt, verified } from "../utils/password.handle";

const registerNewUser = async ({ user, email, password }: User) => {
    const checkIs = await UserModel.findOne({ email });
    const userCheck = await UserModel.findOne({ user });
    if(checkIs) throw new Error("Email already used")
    if(userCheck) throw new Error("User already used")
    const passHash = await encrypt(password);
    const registerNewUser = await UserModel.create({ user, email, password: passHash })
    return registerNewUser;
}

const loginUser = async ({ email, password }: User) => {
    const checkIs = await UserModel.findOne({ email });
    if(!checkIs) throw new Error("User not found")

    const passwordHash = checkIs.password;
    const isCorrect = await verified(password, passwordHash);

    if(!isCorrect) throw new Error("Incorrect password")
        console.log(checkIs)
    const token = generateToken(checkIs as User);
    console.log(token);

    const data = {
        token,
        user: checkIs
    }
    
    return data;
}

export { registerNewUser, loginUser }
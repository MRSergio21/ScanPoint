import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../service/auth.service";

const registerController = async ({ body }: Request, res: Response) => {
    const response =  await registerNewUser(body);
    res.send(response);
}

const loginController = async ({ body }: Request, res: Response) => {
    const { email, password } = body;
    const response =  await loginUser({ email, password });

    if(response === "Password incorrect"){
        res.status(403);
        res.send(response);
    } else {
        res.send(response);
    }

    res.send(response);
}

export { loginController, registerController }
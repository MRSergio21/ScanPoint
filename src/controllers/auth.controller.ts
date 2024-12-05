import { Request, Response } from "express";
import { registerNewUser, loginUser } from "../service/auth.service";

const registerController = async ({ body }: Request, res: Response) => {
    try {
        const response = await registerNewUser(body);
        res.send(response);
    }

    catch (e: any) {
        res.status(500).json({ message: e.message });
    }

}

const loginController = async ({ body }: Request, res: Response) => {
    try {
        const { email, password } = body;
        const response = await loginUser({ email, password });
        res.send(response)
    }

    catch (e: any) {
        res.status(500).json({ message: e.message });
    }
}

export { loginController, registerController }
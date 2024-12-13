import { sign, verify } from "jsonwebtoken";
import { User } from "../interfaces/user.interface";
const JWT_SECRET = process.env.JWT_SECRET || "token.01010101"

const generateToken = (user: User) => {
    const jwt = sign({user}, JWT_SECRET, { expiresIn: "1h" });
    return jwt;
};

const verifyToken = (jwt: string) => {
    const isOk = verify(jwt, JWT_SECRET);
    return isOk;
};

export { generateToken, verifyToken }
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt.handle";

const checkJWT = (req: Request, res: Response, next: NextFunction) => {
    try{
        const jwtUser =  req.headers.authorization || null;
        const jwt = jwtUser?.split(' ').pop();
        const isOk = verifyToken(`${jwt}`);
        if(!isOk){
            res.status(401);
            res.send("You dont have jwt")
        }else{
            console.log({jwtUser});
            next();
        }
    } catch (e) {
        res.status(400);
        res.send("Session no valid");
    }
}

export { checkJWT }
import { Types } from "mongoose";

export interface User {
    _id?: Types.ObjectId;
    user?: string;
    email: string;
    password: string;
}
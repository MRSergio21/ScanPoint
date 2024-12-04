import { Router, Request, Response} from "express";
import { getUser, postUser } from "../controllers/user.controller";

const router = Router();

router.get("/:id", getUser);
router.post("/", postUser);

export { router };
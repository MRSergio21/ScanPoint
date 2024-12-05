import { Router, Request, Response} from "express";
import { deleteImpresora, getImpresora, getImpresoras, postImpresora, updateImpresora } from "../controllers/impresora.controller";
import { checkJWT } from "../middleware/session";

const router = Router();

router.get("/", checkJWT, getImpresoras);
router.get("/:id", checkJWT, getImpresora);
router.post("/", checkJWT, postImpresora);
router.put("/:id", checkJWT, updateImpresora);
router.delete("/:id", checkJWT, deleteImpresora);

export { router };
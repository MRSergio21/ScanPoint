import { Router, Request, Response} from "express";
import { deleteImpresora, getImpresora, getImpresoras, postImpresora, updateImpresora } from "../controllers/impresora.controller";

const router = Router();

router.get("/", getImpresoras);
router.get("/:id", getImpresora);
router.post("/", postImpresora);
router.put("/:id", updateImpresora);
router.delete("/:id", deleteImpresora);

export { router };
import { Router } from "express";
import { welcome } from "../controllers/newHire";

const router = Router();

router.post("/welcome", welcome);

export default router;

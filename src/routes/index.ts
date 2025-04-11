import { Router } from "express";
import authRoutes from "./authRoutes";
import newHireRoutes from "./newHireRoute";
const router = Router();

router.use("/auth", authRoutes);
router.use("/newHire", newHireRoutes);

export default router;

import { Router } from "express";
import authRoutes from "./authRoutes";
import newHireRoutes from "./newHireRoute";
import userRoutes from "./userRoutes";
const router = Router();

router.use("/auth", authRoutes);
router.use("/newHire", newHireRoutes);
router.use("/users", userRoutes);

export default router;

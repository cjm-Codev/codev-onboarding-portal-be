import { Router } from "express";
import { register, login, registerClientFacing } from "../controllers/authController";
import { UserRole } from "../interfaces/userInterface";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post("/register", verifyToken, authorizeRoles(UserRole.SystemAdmin),register);

router.post("/register-client-facing",verifyToken, authorizeRoles(UserRole.HR), registerClientFacing);

router.post("/login", login);

export default router;

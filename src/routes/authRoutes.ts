import { Router } from "express";
import {
	register,
	login,
	resetPassword,
	registerNewHire,
} from "../controllers/authController";
import { UserRole } from "../interfaces/userInterface";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { verifyToken } from "../middleware/verifyToken";

const router = Router();

router.post(
	"/register",
	verifyToken,
	authorizeRoles(UserRole.SystemAdmin),
	register
);

router.post(
	"/register-new-hire",
	verifyToken,
	authorizeRoles(UserRole.HR),
	registerNewHire
);

router.post("/login", login);
router.post("/reset-password", resetPassword);

export default router;

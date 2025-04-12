import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/authModel";
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */ import { UserRole } from "../interfaces/userInterface";

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		const {
			name,
			email,
			password,
			role,
		}: { name: string; email: string; password: string; role: UserRole } =
			req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		const user = new User({ name, email, password, role });
		await user.save();

		res.status(201).json({ message: "User registered successfully" });
	} catch (err: any) {
		res.status(500).json({ message: err.message || "Server error" });
	}
};
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
export const login = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email, password }: { email: string; password: string } = req.body;

		const user = await User.findOne({ email });
		console.log(user);

		if (!user) {
			res.status(400).json({ message: "Invalid credentials" });
			return;
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			res.status(400).json({ message: "Invalid credentials" });
			return;
		}

		const token = jwt.sign(
			{
				_id: user._id,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
			},
			process.env.JWT_SECRET as string,
			{
				expiresIn: "1h",
			}
		);

		res.json({
			token,
			user: {
				_id: user._id,
				email: user.email,
				role: user.role,
				createdAt: user.createdAt,
			},
		});
	} catch (err: unknown) {
		const error = err instanceof Error ? err.message : "Unknown error";
		res.status(500).json({ message: error });
	}
};
/**
 * @swagger
 * /api/auth/reset-password:
 *   post:
 *     summary: Reset a user's password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *               confirmPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 *       400:
 *         description: Invalid input or password mismatch
 *       500:
 *         description: Server error
 */
export const resetPassword = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { email, currentPassword, newPassword, confirmPassword } = req.body;

		const user = await User.findOne({ email });

		if (!user) {
			res.status(400).json({ message: "Email does not exist." });
			return;
		}

		const isMatch = await bcrypt.compare(currentPassword, user.password);
		if (!isMatch) {
			res.status(400).json({ message: "Password incorrect." });
			return;
		}

		if (newPassword !== confirmPassword) {
			res.status(400).json({ message: "Passwords do not match." });
			return;
		}

		user.password = newPassword;
		await user.save();

		res.status(200).json({ message: "Password reset successful" });
	} catch (err) {
		const error = err instanceof Error ? err.message : "Unknown error";
		res.status(500).json({ message: error });
	}
	next();
};
/**
 * @swagger
 * /api/auth/register-new-hire:
 *   post:
 *     summary: Register a new hire
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       201:
 *         description: New hire registered successfully
 *       400:
 *         description: User already exists
 *       500:
 *         description: Server error
 */
export const registerNewHire = async (
	req: Request,
	res: Response
): Promise<void> => {
	const result = register(req, res);
	// TODO new hire email service here
	console.log(result, "result");
};

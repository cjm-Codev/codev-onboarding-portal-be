import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/authModel";
import { UserRole } from "../interfaces/userInterface";
import { welcomeEmail } from "../mailer/newHire";
import { createUser, passwordGenerate } from "../utils/authUtils";

export const register = async (req: Request, res: Response): Promise<void> => {
	try {
		await createUser(req, res, req.body);
		res.status(201).json({ message: "User registered successfully" });
	} catch (err: any) {
		res.status(500).json({ message: err.message || "Server error" });
	}
};

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
			process.env.JWT_SECRET as string
			// Removed for development
			// {
			// 	expiresIn: "1h",
			// }
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

export const registerNewHire = async (
	req: Request,
	res: Response
): Promise<void> => {
	const result = createUser(req, res, req.body);
	// TODO new hire email service here

	// welcomeEmail(email, name);
	console.log(result, "result");
};

export const adminUserCreate = async (
	req: Request,
	res: Response
): Promise<void> => {
	const password = passwordGenerate();

	const userData: any = { ...req.body, password };
	const result: any = createUser(req, res, userData);

	welcomeEmail(result?.email, result?.name);
	res.status(200).json({ message: "New User Succesfully created" });
};

export const adminUserUpdate = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const userId: string = req.params?.userId || "";

		const user = await User.findById(userId);

		if (!user) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		Object.assign(user, req.body);

		await user.save();

		res.status(200).json({ message: "User successfully updated", user });
	} catch (err) {
		const error = err instanceof Error ? err.message : "Unknown error";
		res.status(500).json({ message: error });
	}
};

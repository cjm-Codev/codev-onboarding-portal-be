import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/authModel";
import { UserRole } from "../interfaces/userInterface";
import { welcomeEmail } from "../mailer/newHire";

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
	const result = register(req, res);
	// TODO new hire email service here

	// welcomeEmail(email, name);
	console.log(result, "result");
};

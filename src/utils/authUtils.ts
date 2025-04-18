import { Request, Response } from "express";
import User from "../models/authModel";
import { UserRole } from "../interfaces/userInterface";

export const passwordGenerate = () => {
	const length = 12;
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

	const allChars = uppercase + lowercase + numbers + symbols;

	let password = "";
	for (let i = 0; i < length; i++) {
		password += allChars.charAt(Math.floor(Math.random() * allChars.length));
	}

	return password;
};

export const createUser = async (
	req: Request,
	res: Response,
	userData: any
) => {
	try {
		const {
			name,
			email,
			password,
			role,
		}: { name: string; email: string; password: string; role: UserRole } =
			userData;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			res.status(400).json({ message: "User already exists" });
			return;
		}

		const newUser = new User({ name, email, password, role });
		const savedUser = await newUser.save();

		return savedUser.toJSON();
	} catch (err) {
		const error = err instanceof Error ? err.message : "Unknown error";
		res.status(500).json({ message: error });
	}
};

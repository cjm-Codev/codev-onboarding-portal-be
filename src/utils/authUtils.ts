import { Request, Response } from "express";
import User from "../models/authModel";
import { UserRole } from "../interfaces/userInterface";

export const passwordGenerate = (): string => {
	const length = 12;
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

	const getRandom = (str: string) =>
		str.charAt(Math.floor(Math.random() * str.length));

	let password = [
		getRandom(uppercase),
		getRandom(lowercase),
		getRandom(numbers),
		getRandom(symbols),
	];

	const allChars = uppercase + lowercase + numbers + symbols;

	for (let i = password.length; i < length; i++) {
		password.push(getRandom(allChars));
	}

	const shuffled = password.sort(() => Math.random() - 0.5).join("");

	return shuffled;
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
			return { success: false, message: "User already exists" };
		}

		const newUser = new User({ name, email, password, role });
		const savedUser = await newUser.save();

		return { success: true, user: savedUser.toJSON() };
	} catch (err) {
		const error = err instanceof Error ? err.message : "Unknown error";
		return { success: false, message: error };
	}
};

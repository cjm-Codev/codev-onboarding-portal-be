import { Request, Response } from "express";
import User from "../models/authModel";
import { welcomeEmail } from "../mailer/newHire";

export const welcome = async (req: Request, res: Response): Promise<void> => {
	try {
		const { email }: { email: string } = req.body;

		welcomeEmail(email);

		res.json({ msg: "Welcome Message sent" });
	} catch (err: unknown) {
		const error = err instanceof Error ? err.message : "Unknown error";
		res.status(500).json({ message: error });
	}
};

import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response): Promise<void> => {
	res.status(201).json({ msg: "Registration succesful" });
};

export const login = async (req: Request, res: Response): Promise<void> => {
	res.json({ msg: "login Succesful" });
};

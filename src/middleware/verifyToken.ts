import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req: any, res: any, next: any) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Access Denied" });

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
		req.user = decoded;
		console.log("req.user", req.user);

		next();
	} catch (err) {
		return res.status(403).json({ message: "Invalid Token" });
	}
};

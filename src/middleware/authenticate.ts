import jwt from "jsonwebtoken";
import User from "../models/authModel";

export const authenticate = async (req: any, res: any, next: any) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ message: "Access Denied" });

	try {
		const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
		const userId = decoded._id;

		const findUser = await User.findById(userId);

		if (!findUser) return res.status(403).json({ message: "Invalid Token" });
		const user = findUser.toJSON();
		req.user = user;
		req.role = user.role;

		next();
	} catch (err) {
		return res.status(403).json({ message: "Invalid Token" });
	}
};

import mongoose from "mongoose";
import User from "../models/authModel";
export const verifyEnabled = async (req: any, res: any, next: any) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (user && !user.enabled) {
      return res.status(403).json({ message: "User account is disabled" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};

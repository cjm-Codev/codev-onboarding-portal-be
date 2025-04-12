import mongoose, { Schema } from "mongoose";
import { IUser, UserRole } from "../interfaces/userInterface";
import bcrypt from "bcryptjs";

const UserSchema: Schema<IUser> = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: {
		type: String,
		required: true,
		minlength: 8,
		validate: {
			validator: function (value: string) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value);
			},
			message:
				"Password must include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.",
		},
	},
	role: {
		type: String,
		enum: Object.values(UserRole),
		default: UserRole.ClientFacing,
	},
	firstTimeLogin: { type: Boolean, default: true },
	createdAt: { type: Date, default: Date.now },
});

UserSchema.pre("save", async function (next) {
	if (!this.isModified("password")) return next();
	try {
		this.password = await bcrypt.hash(this.password, 10);
		next();
	} catch (err) {
		next(err as Error);
	}
});

const User = mongoose.model<IUser>("User", UserSchema);
export default User;

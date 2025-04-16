import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.NODE_MAILER_EMAIL,
		pass: process.env.NODE_MAILER_PASS,
	},
});

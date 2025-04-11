import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: "cdvonboarding@gmail.com",
		pass: "ksih zatd idrc pxma",
	},
});

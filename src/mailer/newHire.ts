import { transporter } from "./transporter";

export const welcomeEmail = async (email: string, name: string) => {
	console.log(process.env.NODE_MAILER_EMAIL);
	console.log(process.env.NODE_MAILER_PASS);
	const mailOptions = {
		from: "cdvonboarding@gmail.com",
		to: email,
		subject: "Welcome New Hire!",
		html: `<h1>Hello ${name} we're glad you're here!</p>`,
	};
	await transporter.sendMail(mailOptions);
};

import { transporter } from "./transporter";

export const welcomeEmail = async (to: string) => {
	const mailOptions = {
		from: "cdvonboarding@gmail.com",
		to,
		subject: "Welcome New Hire!",
		html: `<h1>Hello we're glad you're here!</p>`,
	};
	await transporter.sendMail(mailOptions);
};

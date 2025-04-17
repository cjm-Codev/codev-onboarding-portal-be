export const passwordGenerate = () => {
	const length = 12;
	const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const lowercase = "abcdefghijklmnopqrstuvwxyz";
	const numbers = "0123456789";
	const symbols = "!@#$%^&*()_+-=[]{}|;:',.<>/?";

	const allChars = uppercase + lowercase + numbers + symbols;

	let password = "";
	for (let i = 0; i < length; i++) {
		password += allChars.charAt(Math.floor(Math.random() * allChars.length));
	}

	return password;
};

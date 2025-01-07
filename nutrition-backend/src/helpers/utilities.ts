async function generateOrderNumber() {
	const random = Math.random() * 90000000;
	const randomNum = Math.floor(10000000 + random);
	return randomNum;
}

function generateOTP(digit: number = 6): string {
	let otp: string = '';
	for (let i = 0; i < digit; i++) {
		if (i === 0) {
			// first digit can't be zero
			otp += Math.floor(Math.random() * 9 + 1);
		} else {
			otp += Math.floor(Math.random() * 10);
		}
	}
	return otp;
}

function generateVerificationTime(minutesToAdd: number): Date {
	const base = new Date();
	base.setMinutes(base.getMinutes() + minutesToAdd);
	return base;
}

async function generateRandomString() {
	return Math.random().toString(36).slice(2);
}

function getFileExtension(fileName: string): string {
	const lastDotIndex = fileName.lastIndexOf('.');

	// If there's no '.' or it is the first character, return an empty string (no valid extension)
	if (lastDotIndex === -1 || lastDotIndex === 0) {
		return '';
	}

	// Extract and return the extension, starting from the character after the last '.'
	return fileName.substring(lastDotIndex + 1);
}

export default {
	generateOrderNumber,
	generateRandomString,
	generateOTP,
	generateVerificationTime,
	getFileExtension,
};

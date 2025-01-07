const bcrypt = require('bcrypt');

const saltRounds = 12;

async function generateHash(plainPwd: string) {
	const hash = bcrypt.hashSync(plainPwd, saltRounds);
	return hash;
}

async function comparePassword(password: string, encPwd: string) {
	return bcrypt.compareSync(password, encPwd);
}

export default {
	generateHash,
	comparePassword,
};

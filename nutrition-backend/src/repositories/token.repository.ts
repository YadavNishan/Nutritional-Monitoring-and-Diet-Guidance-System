import db from '../../config/sequelize';

const DB: any = db;
const { Token } = DB;

function createToken(data: {
	userId: string;
	type: string;
	value: string;
	expiresAt: Date;
}) {
	return Token.create(data);
}

function findToken(data: { userId: string; type: string }) {
	return Token.findOne({
		where: data,
	});
}

function deleteToken(tokenId: string) {
	return Token.destroy({
		where: {
			id: tokenId,
		},
	});
}

export default {
	createToken,
	findToken,
	deleteToken,
};

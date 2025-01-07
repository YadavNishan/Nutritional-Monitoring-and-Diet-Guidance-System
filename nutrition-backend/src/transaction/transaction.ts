import db from '../../config/sequelize';

async function createTransaction() {
	const transaction = await db.sequelize.transaction();
	return transaction;
}

export default {
	createTransaction,
};

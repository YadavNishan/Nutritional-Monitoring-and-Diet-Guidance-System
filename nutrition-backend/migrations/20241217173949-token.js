'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Token', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
			},
			type: {
				type: Sequelize.ENUM('EMAIL_VERIFICATION', 'PASSWORD_RESET'),
				allowNull: false,
			},
			value: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			expiresAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			createdAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			updatedAt: {
				type: Sequelize.DATE,
				allowNull: false,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Token');
	},
};

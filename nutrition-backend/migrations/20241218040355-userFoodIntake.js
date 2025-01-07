'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('UserFoodIntake', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			userId: {
				type: Sequelize.UUID,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			foodId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'Food',
					key: 'id',
				},
			},
			quantity: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			date: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW,
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
		await queryInterface.dropTable('UserFoodIntake');
	},
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface, Sequelize) {
		// password: 'Password@123'
		await queryInterface.bulkInsert('User', [
			{
				id: '4e6aabbf-fa10-49d0-8b7b-fe15dca0dc41',
				name: 'Admin Shakya',
				email: 'admin.shakya@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				role: 'USER',
				isActive: true,
				gender: 'MALE',
				age: 21,
				weight: 60,
				height: 180,
				activityLevel: 'MODERATELY_ACTIVE',
				calorieGoal: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 'dcc122a1-011d-4af0-9aea-c0b71ca351d1',
				name: 'John Doe',
				email: 'john.doe@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				role: 'USER',
				isActive: true,
				gender: 'MALE',
				age: 21,
				weight: 60,
				height: 180,
				activityLevel: 'MODERATELY_ACTIVE',
				calorieGoal: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
			{
				id: 'b4aaeff2-5f56-4eb1-90e9-772b408afe3e',
				name: 'Bill Gates',
				email: 'bill.gates@gmail.com',
				password:
					'$2b$12$DOP7eot4fEpzZ5TPczFy6eEXfrQ1XY.dzub4Emv5GWgYLu.UyZd5a',
				role: 'USER',
				isActive: true,
				gender: 'MALE',
				age: 21,
				weight: 60,
				height: 180,
				activityLevel: 'MODERATELY_ACTIVE',
				calorieGoal: 2000,
				createdAt: new Date(),
				updatedAt: new Date(),
			},
		]);
	},

	async down(queryInterface, Sequelize) {
		await queryInterface.bulkDelete('User', null, {});
	},
};


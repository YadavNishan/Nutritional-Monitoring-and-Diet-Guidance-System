'use strict';
module.exports = {
	async up(queryInterface, Sequelize) {
		// Create ENUM type for 'role'
		await queryInterface.sequelize.query(`
			DO $$ BEGIN
				CREATE TYPE "public"."enum_User_role" AS ENUM ('ADMIN', 'USER');
			EXCEPTION
				WHEN duplicate_object THEN null;
			END $$;
		`);

		// Create ENUM type for 'gender'
		await queryInterface.sequelize.query(`
			DO $$ BEGIN
				CREATE TYPE "public"."enum_User_gender" AS ENUM ('MALE', 'FEMALE', 'OTHER');
			EXCEPTION
				WHEN duplicate_object THEN null;
			END $$;
		`);

		// Create ENUM type for 'activityLevel'
		await queryInterface.sequelize.query(`
			DO $$ BEGIN
				CREATE TYPE "public"."enum_User_activityLevel" AS ENUM (
					'SEDENTARY',
					'LIGHTLY_ACTIVE',
					'MODERATELY_ACTIVE',
					'VERY_ACTIVE',
					'SUPER_ACTIVE'
				);
			EXCEPTION
				WHEN duplicate_object THEN null;
			END $$;
		`);

		// Create 'User' table
		await queryInterface.createTable('User', {
			id: {
				type: Sequelize.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: Sequelize.UUIDV4,
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			role: {
				type: Sequelize.ENUM('ADMIN', 'USER'),
				defaultValue: 'USER',
				allowNull: false,
			},
			isActive: {
				type: Sequelize.BOOLEAN,
				defaultValue: true,
				allowNull: false,
			},
			gender: {
				type: Sequelize.ENUM('MALE', 'FEMALE', 'OTHER'),
				defaultValue: 'MALE',
				allowNull: false,
			},
			age: {
				type: Sequelize.INTEGER,
				defaultValue: 21,
				allowNull: false,
			},
			weight: {
				type: Sequelize.FLOAT,
				defaultValue: 60,
				allowNull: false,
			},
			height: {
				type: Sequelize.FLOAT,
				defaultValue: 180,
				allowNull: false,
			},
			activityLevel: {
				type: Sequelize.ENUM(
					'SEDENTARY',
					'LIGHTLY_ACTIVE',
					'MODERATELY_ACTIVE',
					'VERY_ACTIVE',
					'SUPER_ACTIVE'
				),
				defaultValue: 'LIGHTLY_ACTIVE',
				allowNull: false,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
	},

	async down(queryInterface, Sequelize) {
		// Drop the 'User' table
		await queryInterface.dropTable('User');

		// Drop ENUM types
		await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "public"."enum_User_role";`);
		await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "public"."enum_User_gender";`);
		await queryInterface.sequelize.query(`DROP TYPE IF EXISTS "public"."enum_User_activityLevel";`);
	},
};

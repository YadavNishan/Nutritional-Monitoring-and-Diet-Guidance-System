import { Model } from 'sequelize';
import pwdHashService from '../service/pwd-hash.service';

interface UserAttributes {
	id: string;
	name: string;
	email: string;
	password: string;
	role: string;
	isActive: boolean;
	gender: string;
	age: number;
	weight: number;
	height: number;
	activityLevel: string;
	calorieGoal: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class User extends Model<UserAttributes> implements UserAttributes {
		id!: string;
		name!: string;
		email!: string;
		password!: string;
		role!: string;
		isActive!: boolean;
		gender!: string;
		age!: number;
		weight!: number;
		height!: number;
		activityLevel!: string;
		calorieGoal!: number;

		static associate(models: any) {
			User.hasMany(models.Token, {
				foreignKey: 'userId',
			});
			User.hasMany(models.UserFoodIntake, {
				foreignKey: 'userId',
			});
		}
	}
	User.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			role: {
				type: DataTypes.ENUM('ADMIN', 'USER'),
				defaultValue: 'USER',
				allowNull: false,
			},
			isActive: {
				type: DataTypes.BOOLEAN,
				allowNull: false,
				defaultValue: true,
			},
			gender: {
				type: DataTypes.ENUM('MALE', 'FEMALE', 'OTHER'),
				defaultValue: 'MALE',
				allowNull: false,
			},
			age: {
				type: DataTypes.INTEGER,
				defaultValue: 21,
				allowNull: false,
			},
			weight: {
				type: DataTypes.FLOAT,
				defaultValue: 60,
				allowNull: false,
			},
			height: {
				type: DataTypes.FLOAT,
				defaultValue: 180,
				allowNull: false,
			},
			activityLevel: {
				type: DataTypes.ENUM(
					'SEDENTARY',
					'LIGHTLY_ACTIVE',
					'MODERATELY_ACTIVE',
					'VERY_ACTIVE',
					'SUPER_ACTIVE'
				),
				defaultValue: 'LIGHTLY_ACTIVE',
				allowNull: false,
			},
			calorieGoal: {
				type: DataTypes.INTEGER,
				defaultValue: 2000,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'User',
		}
	);

	User.beforeCreate(async (user, options) => {
		const hashedPassword = await pwdHashService.generateHash(user.password);
		user.password = hashedPassword;
	});

	return User;
};

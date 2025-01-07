import { Model } from 'sequelize';
import pwdHashService from '../service/pwd-hash.service';

interface UserFoodIntakeAttributes {
	id: string;
	userId: string;
	foodId: string;
	quantity: number;
	date: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class UserFoodIntake
		extends Model<UserFoodIntakeAttributes>
		implements UserFoodIntakeAttributes
	{
		id!: string;
		userId!: string;
		foodId!: string;
		quantity!: number;
		date!: Date;

		static associate(models: any) {
			UserFoodIntake.belongsTo(models.User, {
				foreignKey: 'userId',
			});
			UserFoodIntake.belongsTo(models.Food, {
				foreignKey: 'foodId',
			});
		}
	}
	UserFoodIntake.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			foodId: {
				type: DataTypes.INTEGER,
				allowNull: false,
				references: {
					model: 'Food',
					key: 'id',
				},
			},
			quantity: {
				type: DataTypes.FLOAT,
				allowNull: false,
			},
			date: {
				type: DataTypes.DATE,
				allowNull: false,
				defaultValue: DataTypes.NOW,
			},
		},
		{
			sequelize,
			modelName: 'UserFoodIntake',
		}
	);
	return UserFoodIntake;
};

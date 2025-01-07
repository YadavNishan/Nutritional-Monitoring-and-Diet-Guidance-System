import { Model } from 'sequelize';

interface TokenAttributes {
	id: string;
	userId: string;
	type: string;
	value: string;
	expiresAt: Date;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class Token extends Model<TokenAttributes> implements TokenAttributes {
		id!: string;
		userId!: string;
		type!: string;
		value!: string;
		expiresAt!: Date;

		static associate(models: any) {
			Token.belongsTo(models.User, {
				foreignKey: 'userId',
			});
		}
	}
	Token.init(
		{
			id: {
				type: DataTypes.UUID,
				allowNull: false,
				primaryKey: true,
				defaultValue: DataTypes.UUIDV4,
			},
			type: {
				type: DataTypes.ENUM('EMAIL_VERIFICATION', 'PASSWORD_RESET'),
				allowNull: false,
			},
			value: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: true,
				references: {
					model: 'User',
					key: 'id',
				},
			},
			expiresAt: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			sequelize,
			modelName: 'Token',
		}
	);

	return Token;
};

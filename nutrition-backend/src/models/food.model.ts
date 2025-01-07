import { Model } from 'sequelize';

interface FoodAttributes {
	id: number;
	name: string;
	serving_size: number;
	calories: number;
	total_fat: number;
	saturated_fat: number;
	cholesterol: number;
	sodium: number;
	choline: number;
	vitamin_a: number;
	vitamin_b12: number;
	vitamin_b6: number;
	vitamin_c: number;
	vitamin_d: number;
	vitamin_e: number;
	vitamin_k: number;
	calcium: number;
	copper: number;
	iron: number;
	magnesium: number;
	manganese: number;
	phosphorous: number;
	potassium: number;
	zinc: number;
	protein: number;
	glutamic_acid: number;
	glycine: number;
	carbohydrate: number;
	fiber: number;
	sugars: number;
	fructose: number;
	galactose: number;
	glucose: number;
	lactose: number;
	maltose: number;
	sucrose: number;
	fat: number;
	saturated_fatty_acids: number;
	fatty_acids_total_trans: number;
	alcohol: number;
	ash: number;
	caffeine: number;
	water: number;
}

module.exports = (sequelize: any, DataTypes: any) => {
	class Food extends Model<FoodAttributes> implements FoodAttributes {
		id!: number;
		name!: string;
		serving_size!: number;
		calories!: number;
		total_fat!: number;
		saturated_fat!: number;
		cholesterol!: number;
		sodium!: number;
		choline!: number;
		vitamin_a!: number;
		vitamin_b12!: number;
		vitamin_b6!: number;
		vitamin_c!: number;
		vitamin_d!: number;
		vitamin_e!: number;
		vitamin_k!: number;
		calcium!: number;
		copper!: number;
		iron!: number;
		magnesium!: number;
		manganese!: number;
		phosphorous!: number;
		potassium!: number;
		zinc!: number;
		protein!: number;
		glutamic_acid!: number;
		glycine!: number;
		carbohydrate!: number;
		fiber!: number;
		sugars!: number;
		fructose!: number;
		galactose!: number;
		glucose!: number;
		lactose!: number;
		maltose!: number;
		sucrose!: number;
		fat!: number;
		saturated_fatty_acids!: number;
		fatty_acids_total_trans!: number;
		alcohol!: number;
		ash!: number;
		caffeine!: number;
		water!: number;

		static associate(models: any) {
			Food.hasMany(models.UserFoodIntake, {
				foreignKey: 'foodId',
			});
		}
	}
	Food.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			name: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			serving_size: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			calories: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			total_fat: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			saturated_fat: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			cholesterol: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			sodium: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			choline: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			vitamin_a: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			vitamin_b12: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			vitamin_b6: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			vitamin_c: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			vitamin_d: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			vitamin_e: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			vitamin_k: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			calcium: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			copper: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			iron: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			magnesium: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			manganese: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			phosphorous: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			potassium: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			zinc: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			protein: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			glutamic_acid: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			glycine: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			carbohydrate: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			fiber: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			sugars: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			fructose: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			galactose: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			glucose: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			lactose: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			maltose: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			sucrose: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			fat: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			saturated_fatty_acids: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			fatty_acids_total_trans: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			alcohol: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			ash: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			caffeine: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
			water: {
				type: DataTypes.FLOAT,
				allowNull: true,
			},
		},
		{
			sequelize,
			modelName: 'Food',
		}
	);

	return Food;
};

import { Op } from 'sequelize';
import db from '../../config/sequelize';
import {
	TUserFoodIntake,
	TUserFoodIntakeWithFood,
} from '../types/userFoodIntake';

const DB: any = db;
const { UserFoodIntake, Food } = DB;

function createIntake(data: {
	userId: string;
	foodId: string;
	quantity: number;
	date: Date;
}): Promise<TUserFoodIntake> {
	return UserFoodIntake.create(data);
}

function getDailyIntake(date: string): Promise<TUserFoodIntakeWithFood[]> {
	const startDate = new Date(date);
	const endDate = new Date(startDate);
	endDate.setDate(startDate.getDate() + 1);
	return UserFoodIntake.findAll({
		where: {
			date: {
				[Op.gte]: startDate,
				[Op.lt]: endDate,
			},
		},
		include: [
			{
				model: Food,
				attributes: [
					'id',
					'name',
					'serving_size',
					'calories',
					'carbohydrate',
					'total_fat',
					'cholesterol',
					'protein',
					'fiber',
					'sugars',
					'sodium',
					'vitamin_d',
					'calcium',
					'iron',
					'caffeine',
				],
			},
		],
	});
}

function deleteIntake(id: string): Promise<number> {
	return UserFoodIntake.destroy({
		where: {
			id,
		},
	});
}

export default {
	createIntake,
	getDailyIntake,
	deleteIntake,
};

import { parse, stringify } from 'flatted';
import apiResponse from '../helpers/api-response';
import logger from '../logger';
import userFoodIntakeRepository from '../repositories/userFoodIntake.repository';
import { TFood, TFoodRecommendationNutrients } from '../types/food';
import { TUserFoodIntakeWithFood } from '../types/userFoodIntake';
import nutritionService from '../service/nutrition.service';
import userRepository from '../repositories/user.repository';
import foodRepository from '../repositories/food.repository';
import { queryVectors } from '../service/pinecone.service';

async function addFoodIntake(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to add food intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/track',
		method: 'POST',
	});

	try {
		const { userId, foodId, quantity, date } = req.body;
		const foodIntake = await userFoodIntakeRepository.createIntake({
			userId,
			foodId,
			quantity: quantity / 100, // convert to 100g
			date,
		});
		const successResp = await apiResponse.appResponse(res, foodIntake);
		logger.log.info({
			message: 'Successfully added food intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function getDailyIntake(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to get daily intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/track/daily-intake/:date',
		method: 'GET',
	});

	try {
		const userId = req.body.userId;
		const userObj = await userRepository.findUserById(userId);
		// before "2024-12-18T04:17:21.903Z"
		// after "2024-12-18"
		const dateString = req.params.date.slice(0, 10);
		const dailyIntakeObj =
			await userFoodIntakeRepository.getDailyIntake(dateString);

		// calculate the total intake for the day
		let totalIntake: TFoodRecommendationNutrients = {
			calories: 0,
			carbohydrate: 0,
			total_fat: 0,
			cholesterol: 0,
			protein: 0,
			fiber: 0,
			sugars: 0,
			sodium: 0,
			vitamin_d: 0,
			calcium: 0,
			iron: 0,
			caffeine: 0,
		};
		const flattedDailyIntakeObj: TUserFoodIntakeWithFood[] = parse(
			stringify(dailyIntakeObj)
		);
		flattedDailyIntakeObj.forEach((intake) => {
			totalIntake.calories +=
				parseFloat(intake.Food.calories) * intake.quantity;
			totalIntake.carbohydrate +=
				parseFloat(intake.Food.carbohydrate) * intake.quantity;
			totalIntake.total_fat +=
				parseFloat(intake.Food.total_fat) * intake.quantity;
			totalIntake.cholesterol +=
				parseFloat(intake.Food.cholesterol) * intake.quantity;
			totalIntake.protein +=
				parseFloat(intake.Food.protein) * intake.quantity;
			totalIntake.fiber +=
				parseFloat(intake.Food.fiber) * intake.quantity;
			totalIntake.sugars +=
				parseFloat(intake.Food.sugars) * intake.quantity;
			totalIntake.sodium +=
				parseFloat(intake.Food.sodium) * intake.quantity;
			totalIntake.vitamin_d +=
				parseFloat(intake.Food.vitamin_d) * intake.quantity;
			totalIntake.calcium +=
				parseFloat(intake.Food.calcium) * intake.quantity;
			totalIntake.iron += parseFloat(intake.Food.iron) * intake.quantity;
			totalIntake.caffeine +=
				parseFloat(intake.Food.caffeine) * intake.quantity;
		});

		const recommendedIntake =
			nutritionService.calculateRecommendedNutrients(userObj.calorieGoal);

		// calculate the difference in intake
		const differenceInIntake: TFoodRecommendationNutrients = {
			calories: recommendedIntake.calories - totalIntake.calories,
			carbohydrate:
				recommendedIntake.carbohydrate - totalIntake.carbohydrate,
			total_fat: recommendedIntake.total_fat - totalIntake.total_fat,
			cholesterol:
				recommendedIntake.cholesterol - totalIntake.cholesterol,
			protein: recommendedIntake.protein - totalIntake.protein,
			fiber: recommendedIntake.fiber - totalIntake.fiber,
			sugars: recommendedIntake.sugars - totalIntake.sugars,
			sodium: recommendedIntake.sodium - totalIntake.sodium,
			vitamin_d: recommendedIntake.vitamin_d - totalIntake.vitamin_d,
			calcium: recommendedIntake.calcium - totalIntake.calcium,
			iron: recommendedIntake.iron - totalIntake.iron,
			caffeine: recommendedIntake.caffeine - totalIntake.caffeine,
		};

		const vectorEmbeddings: number[] = [];
		Object.keys(differenceInIntake).forEach((key) => {
			const current =
				totalIntake[key as keyof TFoodRecommendationNutrients];
			const target =
				recommendedIntake[key as keyof TFoodRecommendationNutrients];
			const embedding = nutritionService.calculateEmbeddings(
				current,
				target
			);
			vectorEmbeddings.push(embedding);
		});

		logger.log.info({
			message: `Vector Embeddings: ${vectorEmbeddings.join(', ')}`,
			reqId: req.id,
		});

		// query and get food
		const queryResponse = await queryVectors(vectorEmbeddings);
		// console.log(queryResponse);
		const responseData: {
			food: TFood;
			score: number | undefined;
		}[] = [];

		const tasks = queryResponse.matches.slice(0, 5).map(async (match: any) => {
			const foodId = parseInt(match.id);
			const food = await foodRepository.findFoodById(foodId);
			responseData.push({ food, score: match.score });
		});
		await Promise.all(tasks);

		const successResp = await apiResponse.appResponse(res, {
			dailyIntakeObj,
			totalIntake,
			recommendedIntake,
			recommendation: responseData,
		});
		logger.log.info({
			message: 'Successfully fetched daily intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function deleteFoodIntake(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside userFoodIntake controller to delete food intake',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/track/daily-intake/:intakeId',
		method: 'DELETE',
	});

	try {
		const intakeId = req.params.intakeId;
		const response = await userFoodIntakeRepository.deleteIntake(intakeId);
		const successResp = await apiResponse.appResponse(res, response);
		logger.log.info({
			message: 'Successfully deleted food intake',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	addFoodIntake,
	getDailyIntake,
	deleteFoodIntake,
};

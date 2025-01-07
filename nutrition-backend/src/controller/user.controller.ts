import apiResponse from '../helpers/api-response';
import logger from '../logger';
import userRepository from '../repositories/user.repository';
import nutritionService from '../service/nutrition.service';
import { TUserWithStats } from '../types/user';

async function findUserProfileById(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to find user profile by id',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/profile/:userId',
		method: 'GET',
	});

	try {
		const userId = req.params.userId;
		const userObj = await userRepository.findUserById(userId);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'User not found',
				})
			);
		}
		const calorie = nutritionService.calculateCalorieNeeds(
			userObj.weight,
			userObj.height,
			userObj.age,
			userObj.gender,
			userObj.activityLevel
		);
		const bmi = nutritionService.calculateBMI(
			userObj.weight,
			userObj.height
		);
		const response: TUserWithStats = (userObj as any).dataValues;
		response.calorie = calorie;
		response.bmi = bmi;
		const successResp = await apiResponse.appResponse(res, response);
		logger.log.info({
			message: 'Successfully fetched food by id',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

async function updateUserProfile(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside user controller to update user profile',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/user/update/:userId',
		method: 'PUT',
	});

	try {
		const userId = req.params.userId;
		const userObj = await userRepository.findUserById(userId);
		if (!userObj) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'User not found',
				})
			);
		}
		await userRepository.updateUserProfile(userId, req.body);

		const updatedUserObj = await userRepository.findUserById(userId);
		const calorie = nutritionService.calculateCalorieNeeds(
			updatedUserObj.weight,
			updatedUserObj.height,
			updatedUserObj.age,
			updatedUserObj.gender,
			updatedUserObj.activityLevel
		);
		const updatedCalorie = await userRepository.updateUserProfile(userId, {
			calorieGoal: calorie,
		});
		const successResp = await apiResponse.appResponse(res, updatedCalorie);
		logger.log.info({
			message: 'Successfully updated user profile',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	findUserProfileById,
	updateUserProfile,
};

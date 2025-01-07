import apiResponse from '../helpers/api-response';
import logger from '../logger';
import searchParams from '../helpers/search-params';
import foodRepository from '../repositories/food.repository';

async function findFoodById(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside food controller to find food by id',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/f/food/:foodId',
		method: 'GET',
	});

	try {
		const foodId = req.params.foodId;
		const food = await foodRepository.findFoodById(foodId);
		if (!food) {
			res.statusCode = 404;
			return res.json(
				await apiResponse.errorResponse(req, res, {
					message: 'Food not found',
				})
			);
		}
		const successResp = await apiResponse.appResponse(res, food);
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

async function listFoods(req: any, res: any, next: any) {
	logger.log.info({
		message: 'Inside food controller to list foods',
		reqId: req.id,
		ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
		api: '/f/food/foods',
		method: 'GET',
	});

	try {
		const paginationParams = searchParams.getPaginationParams(req.params);
		const foodList = await foodRepository.listFoods(paginationParams);
		const successResp = await apiResponse.appResponse(res, foodList);
		logger.log.info({
			message: 'Successfully fetched food list',
			reqId: req.id,
		});
		return res.json(successResp);
	} catch (err) {
		logger.log.error({ reqId: req.id, message: err });
		return next(err);
	}
}

export default {
	findFoodById,
	listFoods,
};

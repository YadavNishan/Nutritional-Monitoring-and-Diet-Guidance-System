import express from 'express';
import { validate } from 'express-validation';
import foodController from '../controller/food.controller';
import foodValidation from '../validation/food.validation';

const router = express.Router();

router
	.route('/food/:foodId')
	.get(validate(foodValidation.foodIdInParams), foodController.findFoodById);

router.route('/foods').get(foodController.listFoods);

export default router;

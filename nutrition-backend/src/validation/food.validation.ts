import { Joi } from 'express-validation';

const foodIdInParams = {
	params: Joi.object({
		foodId: Joi.string().required(),
	}),
};

export default {
	foodIdInParams,
};


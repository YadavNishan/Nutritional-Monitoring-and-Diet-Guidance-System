import { Joi } from 'express-validation';

const userFoodIntakeIdInParams = {
	params: Joi.object({
		intakeId: Joi.string().required(),
	}),
};

export default {
	userFoodIntakeIdInParams,
};


import { Joi } from 'express-validation';

const userIdInParams = {
	params: Joi.object({
		userId: Joi.string().uuid().required(),
	}),
};

const findUserByEmail = {
	body: Joi.object({
		email: Joi.string().email().required(),
	}),
};

const updateUserProfile = {
	params: Joi.object({
		userId: Joi.string().uuid().required(),
	}),
	body: Joi.object({
		name: Joi.string().optional(),
		age: Joi.number().optional(),
		gender: Joi.string().optional(),
		weight: Joi.number().optional(),
		height: Joi.number().optional(),
		activityLevel: Joi.string().optional(),
		calorieGoal: Joi.number().optional(),
	}).or(
		'name',
		'age',
		'gender',
		'weight',
		'height',
		'activityLevel',
		'calorieGoal'
	),
};

const addFoodIntake = {
	body: Joi.object({
		foodId: Joi.string().required(),
		userId: Joi.string().uuid().required(),
		quantity: Joi.number().required(),
		date: Joi.date().required(),
	}),
};

const getDailyIntake = {
	params: Joi.object({
		date: Joi.string().required(),
	}),
	body: Joi.object({
		userId: Joi.string().uuid().required(),
	}),
};

export default {
	userIdInParams,
	findUserByEmail,
	updateUserProfile,
	addFoodIntake,
	getDailyIntake,
};

import { TFoodMinimal } from './food';

export type TUserFoodIntake = {
	id: string;
	userId: string;
	foodId: string;
	quantity: number;
	mealType: 'BREAKFAST' | 'LUNCH' | 'SNACK' | 'DINNER';
	date: string;
	createdAt: string;
	updatedAt: string;
};

export type TUserFoodIntakeWithFood = TUserFoodIntake & {
	Food: TFoodMinimal;
};

export type TUserFoodIntakeWithFoodId = TUserFoodIntake & {
	Food: {
		id: string;
	};
};


import { TEducation, TExperience } from './model';
import { TActivityLevels } from './nutrition';

export type TGender = 'MALE' | 'FEMALE' | 'OTHER';
export type TUserRole = 'USER' | 'ADMIN';

export type TUser = {
	id: string;
	name: string;
	email: string;
	password: string;
	role: TUserRole;
	isActive: boolean;
	gender: TGender;
	age: number;
	weight: number;
	height: number;
	activityLevel: TActivityLevels;
	calorieGoal;
	createdAt: Date;
	updatedAt: Date;
};

export type TUserWithStats = TUser & {
	calorie: number;
	bmi: number;
};

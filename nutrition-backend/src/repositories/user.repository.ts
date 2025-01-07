import db from '../../config/sequelize';
import { TPaginationParams, TPaginationResponse } from '../types/searchParams';
import { TUser } from '../types/user';

const DB: any = db;
const { User } = DB;

function createNewUser(data: any): Promise<TUser> {
	return User.create(data);
}

function activateAccount(userId: string): Promise<number[]> {
	return User.update(
		{ isActive: true },
		{
			where: {
				id: userId,
			},
		}
	);
}

function findUserById(userId: string): Promise<TUser> {
	return User.findOne({
		where: {
			id: userId,
		},
	});
}

// security risk if this api is exposed to public
function findUserByEmail(email: string) {
	return User.findOne({
		where: {
			email,
		},
	});
}

async function listAllUsers(paginationParams: TPaginationParams): Promise<{
	pagination: TPaginationResponse;
	rows: TUser[];
}> {
	const records: {
		count: number;
		rows: TUser[];
	} = await User.findAndCountAll({
		offset: (paginationParams.page - 1) * paginationParams.limit,
		limit: paginationParams.limit,
		order: [[paginationParams.sort_by, paginationParams.sort_order]],
	});
	const pagination = {
		currentPage: paginationParams.page,
		pageSize: paginationParams.limit,
		totalPages: Math.ceil(records.count / paginationParams.limit),
		totalRecords: records.count,
	};
	return {
		pagination,
		rows: records.rows,
	};
}

async function updateUserPassword(
	userId: string,
	password: string
): Promise<number[]> {
	const user = await User.findOne({
		where: {
			id: userId,
		},
	});
	if (user) {
		user.password = password;
		await user.save();
	}
	return user;
}

function updateUserProfile(
	userId: string,
	data: {
		name?: string;
		age?: number;
		gender?: string;
		weight?: number;
		height?: number;
		activityLevel?: string;
		calorieGoal?: number;
	}
): Promise<number[]> {
	return User.update(data, {
		where: {
			id: userId,
		},
	});
}

export default {
	listAllUsers,
	activateAccount,
	createNewUser,
	findUserById,
	findUserByEmail,
	updateUserPassword,
	updateUserProfile,
};

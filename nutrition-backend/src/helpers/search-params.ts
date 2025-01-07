import Joi from 'joi';
import { TPaginationParams } from '../types/searchParams';

// Define the Joi schema
const paginationParamsSchema = Joi.object({
	page: Joi.number().integer().min(1).default(1),
	limit: Joi.number().integer().min(2).max(1000).default(10),
	sort_by: Joi.string().default('createdAt'),
	sort_order: Joi.string()
		.valid('ASC', 'DESC', 'asc', 'desc')
		.default('DESC'),
}).unknown(true);

function getPaginationParams(query: any): TPaginationParams {
	const { value, error } = paginationParamsSchema.validate(query);

	if (query.sort_order === 'asc') query.sort_order = 'ASC';
	else if (query.sort_order === 'desc') query.sort_order = 'DESC';

	if (error) {
		throw error;
	}
	const { page, limit, sort_by, sort_order } = value;
	return { page, limit, sort_by, sort_order };
}

function getFilters(
	filter: string | null,
	validFilters: string[],
	defaultFilters: string[]
): string[] {
	if (!filter) return defaultFilters;
	else if (filter.includes('ALL')) {
		return validFilters;
	} else {
		const filters = filter.split(',');
		const invalidFilters = filters.filter(
			(filter: string) => !validFilters.includes(filter)
		);
		if (invalidFilters.length > 0) {
			throw new Error(`Invalid filters: ${invalidFilters.join(', ')}`);
		}
		if (filters.length === 0) return defaultFilters;
		return filters;
	}
}

export default {
	getPaginationParams,
};

export type TPaginationParams = {
	page: number;
	limit: number;
	sort_by: string;
	sort_order: 'ASC' | 'DESC';
};

export type TPaginationResponse = {
	currentPage: number;
	pageSize: number;
	totalPages: number;
	totalRecords: number;
};

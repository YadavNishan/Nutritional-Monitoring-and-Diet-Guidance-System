import { Response } from 'express';
import http from 'http';
import logger from '../logger';

const getStatusText = (statusCode: number) => {
	return http.STATUS_CODES[statusCode] || 'Unknown Status Code';
};

async function appResponse(res: Response, data: any) {
	return {
		statusCode: res.statusCode,
		success: true,
		payload: data,
	};
}

async function errorResponse(
	req: any,
	res: Response,
	stackData: {
		message: string;
		[key: string]: any;
	}
) {
	logger.log.error({
		message: stackData.message,
		reqId: req.id,
	});
	return {
		statusCode: res.statusCode,
		success: false,
		error: getStatusText(res.statusCode),
		stack: stackData,
	};
}

async function unAuthorizedAccess() {
	return {
		success: false,
		status: 401,
		error: 'UNAUTHORIZED_ACCESS',
		stack: {
			message: 'UNAUTHORIZED ACCESS',
		},
	};
}

export default {
	appResponse,
	errorResponse,
	unAuthorizedAccess,
};

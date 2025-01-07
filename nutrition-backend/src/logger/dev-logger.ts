import config from '../../config/config';
const { format, createLogger, transports } = require('winston');

const { timestamp, combine, errors, json, prettyPrint } = format;

function buildLogger() {
	return createLogger({
		format: combine(
			timestamp(),
			errors({ stack: true }),
			prettyPrint(),
			json()
		),
		transports: [
			new transports.File({
				level: 'debug',
				filename: `${config.logFileLocation}/nutrition-logs.log`,
				size: 10000000,
			}),
			new transports.Console(),
		],
	});
}

export default {
	buildLogger,
};

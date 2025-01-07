// const buildDevLogger = require('./dev-logger');
// const buildProdLogger = require('./prod-logger');
import devLogger from './dev-logger';

const log = devLogger.buildLogger();

export default {
	log,
};

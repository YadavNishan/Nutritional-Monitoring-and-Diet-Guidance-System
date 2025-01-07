import express, { Request, Response, NextFunction, Application, ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import createHttpError from 'http-errors';
import { config } from 'dotenv';
import routes from './src/routes/index.route';
import * as uuid from 'uuid';
import * as swaggerUi from 'swagger-ui-express';
import db from './config/sequelize';
import { specs } from './src/helpers/swagger-options';

config();

const app: Application = express();

// parse body params and attache them to req.body
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));

app.use(cookieParser());
// app.use(compress());
// app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use((req: any, res: Response, next: NextFunction) => {
	req.id = uuid.v4();
	next();
});

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // limit each IP to 100 requests per windowMs
});

app.use('/ng/v1', routes);

app.use('/ng/v1/public', limiter);

// app.use('/ng/v1/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
	next(new createHttpError.NotFound());
});

const errorHandler: ErrorRequestHandler = (err, req: Request, res: Response, next: NextFunction) => {
	res.status(err.statusCode || 500);
	res.send({
		status: err.statusCode || 500,
		success: false,
		error: err.error || err.message,
		stack: err.details?.body || err.headers,
		path: req.originalUrl,
		method: req.method,
	});
};

app.use(errorHandler);

const port = Number(process.env.PORT || 3000);

db.sequelize.sync().then(() => {
	app.listen(port, () => console.log(`Server is running on port ${port}`));
});

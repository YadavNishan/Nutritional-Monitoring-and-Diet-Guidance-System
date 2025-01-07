require('dotenv').config();

const config = {
	env: process.env.NODE_ENV,
	port: process.env.PORT,
	jwtSecret: process.env.JWT_SECRET,
	authTokenExpiry: process.env.AUTH_TOKEN_EXPIRY_TIME_IN_DAYS,
	iamAccessId: process.env.AWS_IAM_ACCESS_ID,
	iamSecretKey: process.env.AWS_IAM_SECRET_KEY,
	logFileLocation: process.env.LOG_FILE_LOCATION,
	gmailUserEmail: process.env.GMAIL_USER_EMAIL,
	gmailUserPassword: process.env.GMAIL_USER_PASS,
	frontEndUrl: process.env.FRONTEND_URL,
	pineConeApiKey: process.env.PINECONE_API_KEY,
	postgres: {
		db: process.env.PG_DB,
		port: process.env.PG_PORT,
		host: process.env.PG_HOST,
		user: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
	},
	// re-done for sequelize cli
	database: {
		database: process.env.PG_DB,
		port: process.env.PG_PORT,
		host: process.env.PG_HOST,
		username: process.env.PG_USER,
		password: process.env.PG_PASSWORD,
		dialect: 'postgres',
	},
};

module.exports = config;


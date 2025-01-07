import swaggerJSDoc from 'swagger-jsdoc';
import config from '../../config/config';

const options = {
	definition: {
		openapi: '3.1.0',
		info: {
			title: 'Nutritional Monitoring Express API',
			version: '0.1.0',
			description:
				'This is Nutritional Monitoring and Diet Guidance API application made with Express and documented with Swagger',
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
			contact: {
				name: 'Nutritional Monitoring Backend',
				url: 'https://google.com',
				email: 'emailholder@email.com',
			},
		},
		servers: [
			{
				url: `http://localhost:${config.port}/ng/v1`,
			},
		],
	},
	apis: ['./src/api-docs/**/*.yaml', './src/helpers/swagger-options.ts'],
};

export const specs = swaggerJSDoc(options);

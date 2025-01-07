const request = require('supertest');
const config = require('../config/config');
const assert = require('assert');

const baseUrl = config.test.baseTestUrl;
let userToken = '';

describe('Test User Authentication', () => {
	describe('Register a new user', () => {
		describe('POST /user', () => {
			it('should return 200 status code', async () => {
				const response = await request(baseUrl)
					.post('/user')
					.send({
						firstName: 'John',
						lastName: 'Doe',
						email: config.test.user.email,
						password: config.test.user.password,
						phone: '1234567890',
					})
					.expect(200);
			});
		});
	});

	describe('Login user', () => {
		describe('POST /user/auth', () => {
			it('should return 200 status code with jwt', async () => {
				const response = await request(baseUrl)
					.post('/user/auth')
					.send({
						email: config.test.user.email,
						password: config.test.user.password,
					})
					.expect(200);
				userToken = response.body.payload.token;
			});
		});
	});

	describe('Verify JTW token', () => {
		describe('GET /user/verify', () => {
			it('should return 200 status code with user role and email', async () => {
				const response = await request(baseUrl)
					.get('/user/verify')
					.set('Authorization', 'Bearer ' + userToken)
					.expect(200);
				assert(response.body.payload.role === 'USER');
				assert(response.body.payload.email === config.test.user.email);
			});
		});
	});
});

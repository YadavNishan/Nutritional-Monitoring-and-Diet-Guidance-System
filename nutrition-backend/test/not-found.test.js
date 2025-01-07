const request = require('supertest');
var assert = require('assert');

describe('Test undeclared route', () => {
	describe('GET /not-found', () => {
		it('should return 404 status code', async () => {
			const response = await request('http://localhost:3000/ng/v1').get('/not-found').expect(404);
		});
	});
});

describe('Array', function () {
	describe('#indexOf()', function () {
		it('should return -1 when the value is not present', function () {
			assert.equal([1, 2, 3].indexOf(4), -1);
		});
	});
});

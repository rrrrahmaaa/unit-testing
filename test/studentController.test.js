const request = require('supertest');
const app = require('../index');

describe('GET /', () => {
    test('It should respond with an array of users', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('message');
        expect(response.body).toHaveProperty('users');
    });
});
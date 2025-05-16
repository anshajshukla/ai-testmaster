const request = require('supertest');
const app = require('../../backend/src/index');

describe('Payment API', () => {
  let authToken;

  beforeAll(async () => {
    // Login to get token
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword123',
      });
    authToken = response.body.token;
  });

  test('should get credit score', async () => {
    const response = await request(app)
      .get('/credit-score')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('score');
    expect(typeof response.body.score).toBe('number');
  });

  test('should get cards list', async () => {
    const response = await request(app)
      .get('/cards')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('last4');
  });

  test('should get transactions', async () => {
    const response = await request(app)
      .get('/transactions')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
    expect(response.body[0]).toHaveProperty('id');
    expect(response.body[0]).toHaveProperty('amount');
    expect(response.body[0]).toHaveProperty('date');
  });

  test('should make a payment', async () => {
    const response = await request(app)
      .post('/pay-bill')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cardId: 1,
        amount: 1000,
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('success', true);
    expect(response.body).toHaveProperty('message', 'Payment successful');
  });

  test('should reject payment with missing fields', async () => {
    const response = await request(app)
      .post('/pay-bill')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cardId: 1,
        // Missing amount
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('message', 'Missing required fields');
  });

  test('should handle failed payment', async () => {
    // Mock Math.random to always return a value that triggers failure
    const originalRandom = Math.random;
    Math.random = jest.fn(() => 0.1);

    const response = await request(app)
      .post('/pay-bill')
      .set('Authorization', `Bearer ${authToken}`)
      .send({
        cardId: 1,
        amount: 1000,
      });

    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('success', false);
    expect(response.body).toHaveProperty('message', 'Payment failed');

    // Restore Math.random
    Math.random = originalRandom;
  });
}); 
const request = require('supertest');
const app = require('../../backend/src/index');

describe('Authentication API', () => {
  let authToken;

  test('should login with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'test@example.com',
        password: 'testpassword123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('token');
    authToken = response.body.token;
  });

  test('should fail login with invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: 'wrong@example.com',
        password: 'wrongpassword',
      });

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'Invalid credentials');
  });

  test('should verify valid token', async () => {
    const response = await request(app)
      .get('/verify-token')
      .set('Authorization', `Bearer ${authToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('valid', true);
  });

  test('should reject invalid token', async () => {
    const response = await request(app)
      .get('/verify-token')
      .set('Authorization', 'Bearer invalid-token');

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty('message', 'Invalid token');
  });

  test('should reject request without token', async () => {
    const response = await request(app).get('/verify-token');

    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('message', 'No token provided');
  });
}); 
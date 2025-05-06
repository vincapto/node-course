import request from 'supertest';
import app from './app';

describe('User API', () => {
  let userId: string;

  it('should return an empty array on GET /api/users', async () => {
    const res = await request(app).get('/api/users');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it('should create a new user on POST /api/users', async () => {
    const res = await request(app)
      .post('/api/users')
      .send({ username: 'John', age: 30, hobbies: ['reading'] });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.username).toBe('John');
    expect(res.body.age).toBe(30);
    expect(Array.isArray(res.body.hobbies)).toBe(true);
    userId = res.body.id;
  });

  it('should get the created user by id', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.username).toBe('John');
  });

  it('should update the user by id', async () => {
    const res = await request(app)
      .put(`/api/users/${userId}`)
      .send({ username: 'John Doe', age: 31, hobbies: ['reading', 'sports'] });
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(userId);
    expect(res.body.username).toBe('John Doe');
    expect(res.body.age).toBe(31);
    expect(res.body.hobbies).toContain('sports');
  });

  it('should delete the user by id', async () => {
    const res = await request(app).delete(`/api/users/${userId}`);
    expect(res.status).toBe(204);
  });

  it('should return 404 for deleted user', async () => {
    const res = await request(app).get(`/api/users/${userId}`);
    expect(res.status).toBe(404);
  });
});

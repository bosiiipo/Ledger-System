import request from 'supertest';
import app from '../server';
import {describe, test, expect} from '@jest/globals';
import {faker} from '@faker-js/faker';

describe('POST /auth', () => {
  test('Should respond with a 201 status code', async () => {
    const fakeUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await request(app)
      .post('/v1/auth/register')
      .send(fakeUser);
    expect(response.statusCode).toBe(201);
    console.log({response: response.body.data.user._id});
    expect(response.body).toEqual({
      status: 'success',
      message: 'User created successfully',
      data: {
        user: expect.objectContaining({
          _id: expect.any(String),
          firstName: expect.any(String),
          lastName: expect.any(String),
          email: expect.any(String),
        }),
        jwtToken: expect.any(String),
      },
    });
  });

  test('Should successfully login a newly created user', async () => {
    const fakeUser = {
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
    };

    const response = await request(app)
      .post('/v1/auth/register')
      .send(fakeUser);

    const fakeLogin = {
      email: response.body.data.user.email,
      password: fakeUser.password,
    };

    const authResponse = await request(app).post('/v1/auth/').send(fakeLogin);

    expect(authResponse.statusCode).toBe(200);
    expect(authResponse.body).toEqual({
      status: 'success',
      message: 'User signed in successfully',
      data: expect.any(String),
    });
  });
});

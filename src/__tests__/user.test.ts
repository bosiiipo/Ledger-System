import request from "supertest";
import app from '../server';
import { describe, test, expect } from "@jest/globals";
import { faker } from '@faker-js/faker';

describe("POST /users", () => {
    test("Should respond with a 201 status code", async () => {
        let fakeUser = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password()
        };

        const response = await request(app).post("/v1/auth/register").send(fakeUser);
        console.log(response.body);
        expect(response.statusCode).toBe(201);
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
              jwtToken: expect.any(String)
            }
        });
    })
});
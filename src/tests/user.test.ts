import request from "supertest";
import app from '../server';
import { describe, test, expect } from "@jest/globals";

describe("POST /users", () => {
    test("Should respond with a 201 status code", async () => {
        const response = await request(app).post("http://localhost:9001/v1/auth/register").send({
            firstName: "Olabosipo",
            lastName: "Sogbolu",
            email: "bosiposhogbolu@gmail.com",
            password: "dollars"
        });
        console.log(response.body);
        expect(response.statusCode).toBe(201);
    })
});
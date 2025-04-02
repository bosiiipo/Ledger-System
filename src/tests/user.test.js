"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const globals_1 = require("@jest/globals");
(0, globals_1.describe)("POST /users", () => {
    (0, globals_1.test)("Should respond with a 201 status code", async () => {
        const response = await (0, supertest_1.default)(server_1.default).post("http://localhost:9001/v1/auth/register").send({
            firstName: "Olabosipo",
            lastName: "Sogbolu",
            email: "bosiposhogbolu@gmail.com",
            password: "dollars"
        });
        console.log(response.body);
        (0, globals_1.expect)(response.statusCode).toBe(201);
    });
});
//# sourceMappingURL=user.test.js.map
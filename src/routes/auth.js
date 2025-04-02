"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const validate_1 = require("../middlewares/validate");
const user_schema_1 = require("../validations/user.schema");
const auth_schema_1 = require("../validations/auth.schema");
exports.router = (0, express_1.Router)();
const authController = new auth_controller_1.AuthController();
exports.router.post('/', (0, validate_1.validate)(auth_schema_1.SignInSchema), authController.signIn);
exports.router.post('/register', (0, validate_1.validate)(user_schema_1.CreateUserSchema), authController.createUser);
exports.default = exports.router;
//# sourceMappingURL=auth.js.map
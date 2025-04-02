"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
exports.router = (0, express_1.Router)();
const userController = new user_controller_1.UserController();
const authController = new auth_controller_1.default();
exports.router.get('/:userId', authController.authorizeToken, userController.getUserById);
exports.default = exports.router;
//# sourceMappingURL=user.js.map
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const UserService = __importStar(require("../services/user"));
const responses_1 = require("../responses");
class UserController {
    async createUser(req, res, next) {
        try {
            const params = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
            };
            const response = await UserService.createUser(params);
            return (0, responses_1.sendSuccessResponse)(res, responses_1.StatusCode.CREATED, 'User created successfully', response);
        }
        catch (error) {
            return next(error);
        }
    }
    async getUserById(req, res, next) {
        try {
            const params = {
                userId: req.params.userId
            };
            const response = await UserService.getUserById(params);
            return (0, responses_1.sendSuccessResponse)(res, responses_1.StatusCode.OK, 'User fetched successfully', response);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map
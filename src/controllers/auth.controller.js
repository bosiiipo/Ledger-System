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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const responses_1 = require("../responses");
const jwt_1 = require("../services/jwt");
const AuthService = __importStar(require("../services/auth"));
// import {JsonWebTokenError, TokenExpiredError} from 'jsonwebtoken';
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const { JsonWebTokenError, TokenExpiredError } = jsonwebtoken_1.default;
const errors_1 = require("../responses/errors");
class AuthController {
    async signIn(req, res) {
        const params = {
            email: req.body.email,
            password: req.body.password,
        };
        const response = await AuthService.signInUser(params);
        return (0, responses_1.sendSuccessResponse)(res, responses_1.StatusCode.OK, 'User signed in successfully', response);
    }
    async createUser(req, res) {
        const params = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
        };
        const response = await AuthService.createUser(params);
        return (0, responses_1.sendSuccessResponse)(res, responses_1.StatusCode.CREATED, 'User created successfully', response);
    }
    async authorizeToken(req, res, next) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader)
                return (0, responses_1.sendFailureResponse)(res, responses_1.StatusCode.UNAUTHORIZED, 'Authorization header not found');
            const [bearer, token] = authHeader.split(' ');
            if (!((bearer === null || bearer === void 0 ? void 0 : bearer.toLowerCase()) === 'bearer' && token))
                return (0, responses_1.sendFailureResponse)(res, responses_1.StatusCode.UNAUTHORIZED, 'Invalid authorization header');
            jwt_1.jwtController.verify(token);
            return next();
        }
        catch (error) {
            let localError = null;
            if (error instanceof TokenExpiredError)
                localError = new errors_1.AuthorizationError('Token has expired. Please login again');
            else if (error instanceof JsonWebTokenError)
                localError = new errors_1.AuthorizationError('Invalid token');
            return next(localError || error);
            // throw localError
        }
    }
}
exports.AuthController = AuthController;
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map
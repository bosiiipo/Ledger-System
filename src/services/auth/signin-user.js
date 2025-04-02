"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInUser = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const jwt_1 = require("../jwt");
const errors_1 = require("../../responses/errors");
const signInUser = async (input) => {
    const { email, password } = input;
    const existingUser = await User_model_1.default.findOne({ email });
    if (!existingUser) {
        throw new errors_1.ResourceNotFound("Account not found!");
    }
    const passwordValidated = await existingUser.comparePassword(password);
    if (!passwordValidated)
        throw new errors_1.AuthenticationError("Invalid Password");
    const token = jwt_1.jwtController.sign({ userId: existingUser.id });
    return token;
};
exports.signInUser = signInUser;
//# sourceMappingURL=signin-user.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const errors_1 = require("../../responses/errors");
const getUserById = async (input) => {
    const { userId } = input;
    const existingUser = await User_model_1.default.findById(userId);
    if (!existingUser) {
        throw new errors_1.ResourceNotFound("Account not found!");
    }
    return existingUser;
};
exports.getUserById = getUserById;
//# sourceMappingURL=get-user-by-id.js.map
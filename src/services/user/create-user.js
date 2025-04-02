"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = void 0;
const User_model_1 = __importDefault(require("../../models/User.model"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_1 = require("../jwt");
const createUser = async (input) => {
    const { firstName, lastName, email, password } = input;
    const existingUser = await User_model_1.default.findOne({ email });
    if (existingUser) {
        throw new Error("Email already in use");
    }
    const hashedPassword = await bcryptjs_1.default.hash(password, 10);
    const newUser = new User_model_1.default({
        firstName,
        lastName,
        email,
        password: hashedPassword,
    });
    await newUser.save();
    const userWithoutPassword = await User_model_1.default.findById(newUser._id).lean().select("-password");
    let jwtToken = await jwt_1.jwtController.sign({
        userId: newUser._id
    });
    return { user: userWithoutPassword, jwtToken };
};
exports.createUser = createUser;
//# sourceMappingURL=create-user.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../../config");
class JwtController {
    async sign(data) {
        return await jsonwebtoken_1.default.sign(data, config_1.config.secret, { expiresIn: 3600 });
    }
    async verify(jwtToken) {
        return jsonwebtoken_1.default.verify(jwtToken, config_1.config.secret);
    }
}
exports.jwtController = new JwtController();
//# sourceMappingURL=index.js.map
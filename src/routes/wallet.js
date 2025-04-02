"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const wallet_controller_1 = require("../controllers/wallet.controller");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
exports.router = (0, express_1.Router)();
const walletController = new wallet_controller_1.WalletController();
const authController = new auth_controller_1.default();
exports.router.post('/create/:userId', authController.authorizeToken, walletController.createWallet);
exports.router.post('/:walletId/user/:userId/', authController.authorizeToken, walletController.topUpWallet);
exports.router.post('/send', authController.authorizeToken, walletController.sendMoney);
exports.default = exports.router;
//# sourceMappingURL=wallet.js.map
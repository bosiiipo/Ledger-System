"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const routes_1 = __importDefault(require("./routes"));
const database_1 = require("./database");
const responses_1 = require("./responses");
const errorHandler_1 = __importDefault(require("./middlewares/errorHandler"));
const app = (0, express_1.default)();
app.use(express_1.default.json({ limit: '10mb' }));
app.use((0, morgan_1.default)((tokens, req, res) => {
    return JSON.stringify({
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status_code: tokens.status(req, res),
        content_length: tokens.res(req, res, 'content-length'),
        duration: `${tokens['response-time'](req, res)}ms`,
    });
}));
(0, database_1.connectMongoose)();
app.use('/v1', routes_1.default);
app.use((req, res) => {
    return (0, responses_1.sendFailureResponse)(res, responses_1.StatusCode.NOT_FOUND, 'Route not found');
});
app.use(errorHandler_1.default);
exports.default = app;
//# sourceMappingURL=server.js.map
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
exports.server = exports.default = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
// Import routers
const user_1 = require("./user");
const auth_1 = require("./auth");
// Import middleware
const middleware = __importStar(require("./middleware"));
// Load environment variables
dotenv_1.default.config();
// Set up database connection
const mongoString = process.env.MONGO_URL || '';
mongoose_1.default.set('strictQuery', true);
mongoose_1.default.connect(mongoString, (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('Database Connected');
    }
});
// Create Express app instance
const app = (0, express_1.default)();
exports.default = app;
// Apply middleware
app.use((0, cookie_parser_1.default)());
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Define routes
app.get('/', (req, res) => {
    res.status(200).send('Hello world');
});
app.use(user_1.userPath, user_1.userRouter);
app.use('', auth_1.authRouter);
// Error handling middleware
app.use(middleware.httpLogger);
app.use(middleware.errorHandler);
app.use(middleware.notFoundHandler);
// Start the server
const PORT = process.env.PORT || 8080;
const ENV = process.env.NODE_ENV || 'production';
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} in ${ENV} environment`);
});
exports.server = server;

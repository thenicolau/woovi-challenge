"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const URI = process.env.MONGO_URI || 'mongodb://localhost:27017/';
const initDB = () => {
    mongoose_1.default.connect(URI);
    mongoose_1.default.connection.once('open', () => {
        console.log('connected to database');
    });
};
exports.default = initDB;
//# sourceMappingURL=config.js.map
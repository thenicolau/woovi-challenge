"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./server"));
const config_1 = __importDefault(require("./database/config"));
const port = process.env.PORT || 4000;
server_1.default.listen(port, () => {
    (0, config_1.default)();
});
//# sourceMappingURL=index.js.map
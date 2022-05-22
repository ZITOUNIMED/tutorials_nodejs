"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((req, res) => {
    res.end('hello world!');
});
app.listen(3200, () => {
    console.log('Server is running on port 3200.');
});

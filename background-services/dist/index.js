"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const run = () => {
    node_cron_1.default.schedule('* * * * * *', () => {
        console.log('running task every minute');
    });
};
run();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`background services in running on port ${PORT}`);
});

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const node_cron_1 = __importDefault(require("node-cron"));
const welcomeEmail_1 = __importDefault(require("./email service/welcomeEmail"));
const admissionReport_1 = __importDefault(require("./email service/admissionReport"));
const diagnosisEmail_1 = __importDefault(require("./email service/diagnosisEmail"));
const appointmentEmail_1 = __importDefault(require("./email service/appointmentEmail"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const run = () => {
    node_cron_1.default.schedule('* * * * * *', () => {
        console.log('running task every second');
        (0, welcomeEmail_1.default)();
        (0, admissionReport_1.default)();
        (0, diagnosisEmail_1.default)();
        (0, appointmentEmail_1.default)();
    });
};
// run();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`background services in running on port ${PORT}`);
});

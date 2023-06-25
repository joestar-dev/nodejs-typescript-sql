"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = exports.appointmentRoute = exports.diagnosisRoute = exports.patientRoute = void 0;
const patient_1 = __importDefault(require("./patient"));
exports.patientRoute = patient_1.default;
const diagnosis_1 = __importDefault(require("./diagnosis"));
exports.diagnosisRoute = diagnosis_1.default;
const appointment_1 = __importDefault(require("./appointment"));
exports.appointmentRoute = appointment_1.default;
const users_1 = __importDefault(require("./users"));
exports.userRoute = users_1.default;

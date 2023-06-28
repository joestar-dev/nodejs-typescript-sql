"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.getUsers = exports.signIn = exports.signUp = void 0;
const user_validation_1 = require("../Helpers/user-validation");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../Helpers/database"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const db = new database_1.default();
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, password, email, role } = req.body;
    try {
        const { error, value } = user_validation_1.registerSchema.validate(req.body);
        if (error) {
            res.status(500).json(error.details[0].message);
        }
        const hashPassword = yield bcrypt_1.default.hash(password, 10);
        yield db.exec('signUp', { name, email, password: hashPassword, role });
        res.status(201).json({ message: 'successfully created user' });
    }
    catch (err) {
        res.status(500).json({ message: 'server is unable to handle the request' });
    }
});
exports.signUp = signUp;
const signIn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const { error, value } = user_validation_1.loginSchema.validate(req.body);
        if (error) {
            res.status(500).json(error.details[0].message);
        }
        const user = yield db.exec('signin', { email, password });
        const userData = user === null || user === void 0 ? void 0 : user.recordset[0];
        bcrypt_1.default.compare(password, userData.password, (err, data) => {
            if (data) {
                const { role, name, email, id } = userData, rest = __rest(userData, ["role", "name", "email", "id"]);
                const user = { id, name, email, role };
                const token = jsonwebtoken_1.default.sign(user, process.env.KEY, {
                    expiresIn: '30days'
                });
                res.status(200).json({ user, token });
            }
            else {
                res.status(500).json({ message: 'This is wrong password' });
            }
        });
    }
    catch (error) {
        res.status(400).json({ error: error });
    }
});
exports.signIn = signIn;
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = (yield db.exec('getAllusers')).recordset;
        res.status(200).json(users);
    }
    catch (error) {
        res.status(400).json({ error: "Something went wrong" });
    }
});
exports.getUsers = getUsers;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        yield db.exec('deleteUsers', { id });
        res.status(201).json({ message: "User is deleted successful" });
    }
    catch (error) {
        res.status(400).json({ error: "Something went wrong" });
    }
});
exports.deleteUser = deleteUser;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = require("../controllers/users");
const router = (0, express_1.Router)();
router.get('/', users_1.getUsers);
router.post('/signin', users_1.signIn);
router.post('/signup', users_1.signUp);
exports.default = router;

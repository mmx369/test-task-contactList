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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = __importDefault(require("../models/user"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (email === undefined) {
        return res.status(400).json({ error: 'Email must be provided' });
    }
    const user = yield user_1.default.findOne({ email }).exec();
    if (user) {
        return res.status(400).json({ error: 'User already exist' });
    }
    if (password === undefined || password.length < 5) {
        return res
            .status(400)
            .json({ error: 'Password must be at least 5 characters' });
    }
    else {
        const saltRounds = 10;
        const passwordHash = yield bcryptjs_1.default.hash(password, saltRounds);
        const user = new user_1.default({
            email,
            passwordHash,
        });
        try {
            const savedUser = yield user.save();
            res.status(201).json({ msg: `User ${savedUser.email} created!` });
        }
        catch (err) {
            console.log(err);
        }
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield user_1.default.findOne({ email });
    const passwordCorrect = user === null ? false : yield bcryptjs_1.default.compare(password, user.passwordHash);
    if (!(user && passwordCorrect)) {
        return res.status(401).json({
            error: 'Invalid email or password.',
        });
    }
    const userForToken = {
        email: user.email,
        id: user._id,
    };
    const token = jsonwebtoken_1.default.sign(userForToken, process.env.SECRET, {
        expiresIn: '336h',
    });
    res.status(200).send({ token, userForToken });
});
exports.login = login;

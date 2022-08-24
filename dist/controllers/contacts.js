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
exports.updateContact = exports.deleteContact = exports.addNewContact = exports.getAllContacts = exports.getSingleContact = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const contact_1 = __importDefault(require("../models/contact"));
const user_1 = __importDefault(require("../models/user"));
const getSingleContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.token) {
        return res.status(401).json({ error: 'token missing' });
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(res.token, process.env.SECRET);
    }
    catch (e) {
        res.status(401).json({ error: e });
    }
    if (!res.token || !(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id)) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const contact = yield contact_1.default.findById(req.params.id);
    res.json(contact);
});
exports.getSingleContact = getSingleContact;
const getAllContacts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.token) {
        return res.status(401).json({ error: 'token missing' });
    }
    let decodedToken;
    decodedToken = jsonwebtoken_1.default.verify(res.token, process.env.SECRET);
    if (!res.token || !(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id)) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    try {
        const contacts = yield contact_1.default.find({});
        res.json(contacts);
    }
    catch (error) {
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.getAllContacts = getAllContacts;
const addNewContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, address } = req.body;
    const decodedToken = jsonwebtoken_1.default.verify(res.token, process.env.SECRET);
    if (!res.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    const user = yield user_1.default.findById(decodedToken.id);
    if (!user) {
        return res.status(401).json({ error: 'User not found' });
    }
    const contact = new contact_1.default({
        name,
        phone,
        address,
        user: user._id,
    });
    try {
        const savedContact = yield contact.save();
        res.status(201).json(savedContact);
    }
    catch (error) {
        if (error instanceof Error) {
            if (error.code === 11000) {
                res.status(400).json({ error: 'Contact name must be unique.' });
            }
        }
        res.status(500).json({ error: 'Something went wrong. Try later.' });
    }
});
exports.addNewContact = addNewContact;
const deleteContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!res.token) {
        return res.status(401).json({ error: 'token missing' });
    }
    let decodedToken;
    decodedToken = jsonwebtoken_1.default.verify(res.token, process.env.SECRET);
    if (!res.token || !decodedToken.id) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    try {
        yield contact_1.default.findByIdAndRemove(req.params.id);
        const contacts = yield contact_1.default.find({});
        res.json(contacts);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Something went wrong' });
    }
});
exports.deleteContact = deleteContact;
const updateContact = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, phone, address, id } = req.body;
    if (!res.token) {
        return res.status(401).json({ error: 'token missing' });
    }
    let decodedToken;
    try {
        decodedToken = jsonwebtoken_1.default.verify(res.token, process.env.SECRET);
    }
    catch (e) {
        res.status(401).json({ error: e });
    }
    if (!res.token || !(decodedToken === null || decodedToken === void 0 ? void 0 : decodedToken.id)) {
        return res.status(401).json({ error: 'token missing or invalid' });
    }
    try {
        const contact = yield contact_1.default.findByIdAndUpdate(id, {
            name,
            phone,
            address,
        }, { runValidators: true });
        res.json(contact);
    }
    catch (err) {
        console.log(err);
        res.status(401).json({ error: 'something went wrong' });
    }
});
exports.updateContact = updateContact;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contactSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    phone: String,
    address: String,
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: 'User',
    },
});
const Contact = mongoose_1.default.model('Contact', contactSchema);
exports.default = Contact;

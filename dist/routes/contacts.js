"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const contacts_1 = require("../controllers/contacts");
const router = express_1.default.Router();
router.get('/contacts/:id', contacts_1.getSingleContact);
router.get('/contacts', contacts_1.getAllContacts);
router.post('/contacts', contacts_1.addNewContact);
router.delete('/contacts/:id', contacts_1.deleteContact);
router.put('/contacts/', contacts_1.updateContact);
module.exports = router;

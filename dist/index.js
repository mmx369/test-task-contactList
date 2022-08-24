"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const errors_1 = require("./middleware/errors");
const tokenExtractor_1 = require("./middleware/tokenExtractor");
const auth_1 = __importDefault(require("./routes/auth"));
const contacts_1 = __importDefault(require("./routes/contacts"));
const path = require('path');
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.static('build'));
app.use(express_1.default.json());
app.use(tokenExtractor_1.tokenExtractor);
app.use('/api/auth', auth_1.default);
app.use('/api', contacts_1.default);
app.get('*', (req, res) => {
    const options = {
        root: path.join(__dirname, 'build'),
    };
    res.sendFile('index.html', options);
});
app.use(errors_1.unknownEndpoint);
mongoose_1.default
    .connect(process.env.MONGODB_URI)
    .then((result) => {
    console.log('[server]: Connected to MongoDB');
    app.listen(port, () => {
        console.log(`[server]: Server is running at https://localhost:${port}`);
    });
})
    .catch((err) => {
    console.log(err);
});

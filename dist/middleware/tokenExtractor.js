"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenExtractor = void 0;
const tokenExtractor = (req, res, next) => {
    const authorization = req.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        res.token = authorization.substring(7);
    }
    else {
        res.token = null;
    }
    next();
};
exports.tokenExtractor = tokenExtractor;

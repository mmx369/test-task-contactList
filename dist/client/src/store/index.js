"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const query_1 = require("@reduxjs/toolkit/query");
const app_slice_1 = __importDefault(require("../store/app/app.slice"));
const contact_slice_1 = __importDefault(require("../store/app/contact.slice"));
const filter_slice_1 = __importDefault(require("../store/app/filter.slice"));
const focus_slice_1 = __importDefault(require("../store/app/focus.slice"));
const app_api_1 = require("./app/app.api");
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        [app_api_1.contactApi.reducerPath]: app_api_1.contactApi.reducer,
        user: app_slice_1.default,
        contacts: contact_slice_1.default,
        focus: focus_slice_1.default,
        filter: filter_slice_1.default,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(app_api_1.contactApi.middleware),
});
(0, query_1.setupListeners)(exports.store.dispatch);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = exports.tokenSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = null;
exports.tokenSlice = (0, toolkit_1.createSlice)({
    name: 'token',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state = action.payload;
            return state;
        },
    },
});
exports.addUser = exports.tokenSlice.actions.addUser;
exports.default = exports.tokenSlice.reducer;

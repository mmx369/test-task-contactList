"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeFocus = exports.focusSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = false;
exports.focusSlice = (0, toolkit_1.createSlice)({
    name: 'focus',
    initialState,
    reducers: {
        changeFocus: (state, action) => {
            return action.payload;
        },
    },
});
exports.changeFocus = exports.focusSlice.actions.changeFocus;
exports.default = exports.focusSlice.reducer;

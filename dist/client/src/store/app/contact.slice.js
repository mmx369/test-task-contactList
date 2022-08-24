"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addContact = exports.contactSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = null;
exports.contactSlice = (0, toolkit_1.createSlice)({
    name: 'contacts',
    initialState,
    reducers: {
        addContact: (state, action) => {
            state = [...state, action.payload];
            return state;
        },
    },
});
exports.addContact = exports.contactSlice.actions.addContact;
exports.default = exports.contactSlice.reducer;

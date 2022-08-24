"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeFilter = exports.filterSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = '';
exports.filterSlice = (0, toolkit_1.createSlice)({
    name: 'filter',
    initialState,
    reducers: {
        changeFilter: (state, action) => {
            return action.payload;
        },
    },
});
exports.changeFilter = exports.filterSlice.actions.changeFilter;
exports.default = exports.filterSlice.reducer;

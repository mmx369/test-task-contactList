"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("react-dom/client"));
const react_redux_1 = require("react-redux");
const index_1 = require("../src/store/index");
const App_1 = __importDefault(require("./App"));
require("./index.css");
const root = client_1.default.createRoot(document.getElementById('root'));
root.render(<react_redux_1.Provider store={index_1.store}>
    <App_1.default />
  </react_redux_1.Provider>);

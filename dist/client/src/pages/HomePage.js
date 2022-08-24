"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_redux_1 = require("react-redux");
const LoginForm_1 = require("../components/LoginForm");
const ContactPage_1 = __importDefault(require("./ContactPage"));
function HomePage() {
    const user = (0, react_redux_1.useSelector)((state) => state.user);
    return (<div className='grid place-items-center mt-10'>
      {user === null ? <LoginForm_1.LoginForm /> : <ContactPage_1.default />}
    </div>);
}
exports.default = HomePage;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const Nav_1 = __importDefault(require("./components/Nav"));
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const contacts_1 = __importDefault(require("./services/contacts"));
const app_slice_1 = require("./store/app/app.slice");
function App() {
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedTestAppUser');
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            dispatch((0, app_slice_1.addUser)(user));
            contacts_1.default.setToken(user.token);
        }
    }, [dispatch]);
    return (<>
      <Nav_1.default />
      <HomePage_1.default />
    </>);
}
exports.default = App;

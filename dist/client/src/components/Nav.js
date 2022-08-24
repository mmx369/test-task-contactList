"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const app_slice_1 = require("../store/app/app.slice");
const focus_slice_1 = require("../store/app/focus.slice");
const AddNewContactForm_1 = __importDefault(require("./AddNewContactForm"));
function Nav() {
    const user = (0, react_redux_1.useSelector)((state) => state.user);
    const dispatch = (0, react_redux_1.useDispatch)();
    const [isOpen, setIsOpen] = (0, react_1.useState)(false);
    const showAddContactForm = () => {
        setIsOpen(true);
        dispatch((0, focus_slice_1.changeFocus)(false));
    };
    const handleSignOut = () => {
        window.localStorage.removeItem('loggedTestAppUser');
        dispatch((0, app_slice_1.addUser)(null));
    };
    return (<>
      <nav className='flex justify-between items-center h-[50px] px-5 shadow-md bg-gray-500 text-white'>
        <h3 className='font-bold'>Contact List</h3>
        <span>
          {user && (<button className='inline-block px-6 py-2 border-0 text-white-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' onClick={showAddContactForm}>
              Add Contact
            </button>)}

          {user && (<button className='inline-block px-6 py-2 border-0 text-white-400 font-medium text-xs leading-tight uppercase rounded hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out' onClick={handleSignOut}>
              Sign out
            </button>)}
        </span>
      </nav>
      {isOpen ? <AddNewContactForm_1.default setIsOpen={setIsOpen}/> : null}
    </>);
}
exports.default = Nav;

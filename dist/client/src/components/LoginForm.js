"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginForm = void 0;
const react_1 = __importStar(require("react"));
const react_redux_1 = require("react-redux");
const react_toastify_1 = require("react-toastify");
const contacts_1 = __importDefault(require("../services/contacts"));
const login_1 = __importDefault(require("../services/login"));
const user_1 = require("../services/user");
const app_slice_1 = require("../store/app/app.slice");
const focus_slice_1 = require("../store/app/focus.slice");
const FormInput_1 = require("./UI/FormInput");
const LoginForm = () => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const [formData, setFormData] = (0, react_1.useState)({
        email: '',
        password: '',
    });
    const inputs = [
        {
            id: 1,
            name: 'email',
            type: 'email',
            placeholder: 'Enter email',
            errorMsg: 'It should be a valid email address.',
            label: 'Email',
            required: true,
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            pattern: `^.{6,}$`,
            errorMsg: 'Password should be at least 6 characters.',
            label: 'Password',
            required: true,
        },
    ];
    const handleChange = ({ target }) => setFormData(Object.assign(Object.assign({}, formData), { [target.name]: target.value }));
    const handleLogin = (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        try {
            const user = yield login_1.default.login(formData);
            window.localStorage.setItem('loggedTestAppUser', JSON.stringify(user));
            dispatch((0, app_slice_1.addUser)(user));
            contacts_1.default.setToken(user.token);
            setFormData({ email: '', password: '' });
        }
        catch (err) {
            react_toastify_1.toast.error(err.response.data.error, {
                position: react_toastify_1.toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    });
    const handleSignUp = (formData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield (0, user_1.createUser)(formData);
            setFormData({ email: '', password: '' });
            dispatch((0, focus_slice_1.changeFocus)(false));
            react_toastify_1.toast.success(res, {
                position: react_toastify_1.toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        catch (err) {
            react_toastify_1.toast.error(err.response.data.error, {
                position: react_toastify_1.toast.POSITION.TOP_RIGHT,
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    });
    return (<>
      <div className='block p-6 rounded-lg shadow-lg bg-white max-w-sm'>
        <form onSubmit={handleLogin}>
          {inputs.map((input) => (<FormInput_1.FormInput key={input.id} value={formData[input.name]} onChange={handleChange} {...input}/>))}
          <button type='submit' className='w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out
      mb-2'>
            sign in
          </button>
        </form>
        <button className='w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out' onClick={() => handleSignUp(formData)}>
          sign up
        </button>
        <react_toastify_1.ToastContainer />
      </div>
    </>);
};
exports.LoginForm = LoginForm;

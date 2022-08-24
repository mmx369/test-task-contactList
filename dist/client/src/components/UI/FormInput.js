"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormInput = void 0;
const react_1 = __importDefault(require("react"));
const react_redux_1 = require("react-redux");
const focus_slice_1 = require("../../store/app/focus.slice");
const FormInput = (props) => {
    const dispatch = (0, react_redux_1.useDispatch)();
    const { label, name, errorMsg, onChange, id } = props, inputProps = __rest(props, ["label", "name", "errorMsg", "onChange", "id"]);
    const focus = (0, react_redux_1.useSelector)((state) => state.focus);
    return (<div className='form-group mb-6'>
      {label && (<label htmlFor={name} className='form-label inline-block mb-2 text-gray-700'>
          {label}
        </label>)}
      <input className='peer form-control
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none' name={name} {...inputProps} onChange={onChange} onBlur={() => dispatch((0, focus_slice_1.changeFocus)(true))} onFocus={() => name === 'password' && dispatch((0, focus_slice_1.changeFocus)(true))}/>
      <span className={focus
            ? `invisible peer-invalid:visible text-xs text-red-500 p-0 m-0`
            : 'invisible text-xs p-0 m-0'}>
        {errorMsg}
      </span>
    </div>);
};
exports.FormInput = FormInput;

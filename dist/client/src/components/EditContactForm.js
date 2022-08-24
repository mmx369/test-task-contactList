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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_toastify_1 = require("react-toastify");
const app_api_1 = require("../store/app/app.api");
function EditContactForm({ setShowModal, contact }) {
    const [newContact, setNewContact] = (0, react_1.useState)({
        name: contact === null || contact === void 0 ? void 0 : contact.name,
        phone: contact === null || contact === void 0 ? void 0 : contact.phone,
        address: contact === null || contact === void 0 ? void 0 : contact.address,
        id: contact === null || contact === void 0 ? void 0 : contact._id,
    });
    const [updateContact] = (0, app_api_1.useUpdateContactMutation)();
    const handleChange = (e) => {
        setNewContact(Object.assign(Object.assign({}, newContact), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = () => __awaiter(this, void 0, void 0, function* () {
        try {
            yield updateContact(newContact);
            setShowModal(false);
            react_toastify_1.toast.success(`Contact updated.`, {
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
            react_toastify_1.toast.error(`Something went wrong. Try later.`, {
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
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='fixed inset-0 w-full h-full bg-black opacity-40' onClick={() => setShowModal(false)}></div>
        <div className='flex items-center min-h-screen'>
          <div className='relative max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
            <div className='sm:flex'>
              <div>
                <h4 className='text-lg font-medium text-gray-800 text-center'>
                  Edit Contact
                </h4>
                <div className='relative p-2 flex-auto'>
                  <form className='bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full'>
                    <label className='block text-black text-sm font-bold mb-1'>
                      Name
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-1 text-black' name='name' value={newContact.name} onChange={handleChange}/>
                    <label className='block text-black text-sm font-bold mb-1'>
                      Phone
                    </label>
                    <input className='shadow appearance-none border rounded w-full py-2 px-1 text-black' name='phone' value={newContact.phone} onChange={handleChange}/>
                    <label className='block text-black text-sm font-bold mb-1'>
                      Address
                    </label>
                    <textarea className='shadow appearance-none border rownded w-full py-2 px-1 text-black' rows={3} name='address' value={newContact.address} onChange={handleChange}/>
                  </form>
                </div>

                <div className='items-center gap-2 mt-3 sm:flex'>
                  <button className='w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2' onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button className='w-full mt-2 p-2.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2' onClick={handleSubmit}>
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}
exports.default = EditContactForm;

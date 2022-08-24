"use strict";
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
const react_1 = require("react");
const react_toastify_1 = require("react-toastify");
const app_api_1 = require("../store/app/app.api");
const FormInput_1 = require("./UI/FormInput");
function AddNewContactForm({ setIsOpen }) {
    const [contact, setContact] = (0, react_1.useState)({
        name: '',
        phone: '',
        address: '',
    });
    const [addContact] = (0, app_api_1.useAddContactsMutation)();
    const inputs = [
        {
            id: 1,
            name: 'name',
            type: 'text',
            placeholder: 'Name',
            errorMsg: 'It should not to be empty',
            required: true,
        },
        {
            id: 2,
            name: 'phone',
            type: 'tel',
            placeholder: 'Phone +79261111111',
            pattern: '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$',
            required: true,
            errorMsg: 'It should be a valid phone number.',
        },
    ];
    const handleCreate = (e) => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield addContact(contact).unwrap();
            setContact({
                name: '',
                phone: '',
                address: '',
            });
            setIsOpen(false);
            react_toastify_1.toast.success(`New contact ${res.name} added`, {
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
            react_toastify_1.toast.error(`Error: ${err.data.error}`, {
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
    const handleChange = ({ target, }) => setContact(Object.assign(Object.assign({}, contact), { [target.name]: target.value }));
    return (<>
      <div className='fixed inset-0 z-10 overflow-y-auto'>
        <div className='fixed inset-0 w-full h-full bg-black opacity-40' onClick={() => setIsOpen(false)}></div>
        <div className='flex items-center min-h-screen'>
          <div className='relative max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg'>
            <div className='sm:flex'>
              <div>
                <h4 className='text-lg font-medium text-gray-800 text-center'>
                  Add New Contact
                </h4>
                <div className='relative p-2 flex-auto'>
                  <form>
                    {inputs.map((input) => (<FormInput_1.FormInput key={input.id} value={contact[input.name]} onChange={handleChange} {...input}/>))}

                    <div className='form-group mb-6'>
                      <textarea className='
           form-control
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
           focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
         ' value={contact.address} name='address' onChange={handleChange} rows={3} placeholder='Address'/>
                    </div>
                  </form>
                </div>

                <div className='items-center gap-2 mt-3 sm:flex'>
                  <button className='w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2' onClick={() => setIsOpen(false)}>
                    Cancel
                  </button>
                  <button className='w-full mt-2 p-2.5 flex-1 text-white bg-blue-600 rounded-md outline-none ring-offset-2 ring-blue-600 focus:ring-2' onClick={handleCreate}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}
exports.default = AddNewContactForm;

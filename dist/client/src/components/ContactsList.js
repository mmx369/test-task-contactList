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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const react_toastify_1 = require("react-toastify");
const useSearch_1 = require("../hooks/useSearch");
const contacts_1 = __importDefault(require("../services/contacts"));
const app_api_1 = require("../store/app/app.api");
const EditContactForm_1 = __importDefault(require("./EditContactForm"));
const EmptyCard_1 = __importDefault(require("./EmptyCard"));
const ListCard_1 = __importDefault(require("./ListCard"));
function ContactsList({ contacts }) {
    const filter = (0, react_redux_1.useSelector)((state) => state.filter);
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const [contact, setContact] = (0, react_1.useState)(null);
    const [deleteContact] = (0, app_api_1.useDeleteContactMutation)();
    const handleDelete = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            yield deleteContact(id).unwrap();
            react_toastify_1.toast.success(`Contact deleted.`, {
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
    const handleEdit = (id) => __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield contacts_1.default.getSingleContact(id);
            setContact(res);
            setShowModal(true);
        }
        catch (err) {
            setShowModal(true);
        }
    });
    const searchedContacts = (0, useSearch_1.useSearch)(contacts, filter);
    if (searchedContacts.length === 0) {
        return <EmptyCard_1.default />;
    }
    return (<>
      {showModal ? (<EditContactForm_1.default showModal={showModal} setShowModal={setShowModal} contact={contact}/>) : null}
      <div>
        {searchedContacts.map((contact) => (<ListCard_1.default key={contact._id} contact={contact} handleEdit={handleEdit} handleDelete={handleDelete}/>))}
      </div>
      <react_toastify_1.ToastContainer />
    </>);
}
exports.default = ContactsList;

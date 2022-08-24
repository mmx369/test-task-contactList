"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSearch = void 0;
const react_1 = require("react");
function SortData(x, y) {
    return x.name.localeCompare(y.name);
}
const useSearch = (contacts, query) => {
    const searchedContacts = (0, react_1.useMemo)(() => {
        return contacts.filter((contact) => contact.name.toLowerCase().includes(query.toLowerCase()));
    }, [query, contacts]);
    return searchedContacts.sort(SortData);
};
exports.useSearch = useSearch;

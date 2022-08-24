"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useLazyGetSingleContactQuery = exports.useUpdateContactMutation = exports.useDeleteContactMutation = exports.useAddContactsMutation = exports.useGetAllContactsQuery = exports.contactApi = void 0;
const react_1 = require("@reduxjs/toolkit/query/react");
exports.contactApi = (0, react_1.createApi)({
    reducerPath: 'contactApi',
    tagTypes: ['Contacts', 'Contact'],
    baseQuery: (0, react_1.fetchBaseQuery)({
        baseUrl: 'http://localhost:5000',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().user.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    refetchOnFocus: true,
    endpoints: (build) => ({
        getSingleContact: build.query({
            query: (id) => ({
                url: `api/contacts/${id}`,
            }),
            providesTags: (result, error, _id) => [{ type: 'Contact', _id }],
        }),
        getAllContacts: build.query({
            query: () => ({
                url: 'api/contacts',
            }),
            providesTags: (result) => result
                ? [
                    ...result.map(({ _id }) => ({ type: 'Contacts', _id })),
                    { type: 'Contacts', id: 'LIST' },
                ]
                : [{ type: 'Contacts', id: 'LIST' }],
        }),
        addContacts: build.mutation({
            query: (body) => ({
                url: 'api/contacts',
                method: 'POST',
                body,
            }),
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
        updateContact: build.mutation({
            query: (body) => ({
                url: 'api/contacts',
                method: 'PUT',
                body,
            }),
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
        deleteContact: build.mutation({
            query: (id) => ({
                url: `api/contacts/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
        }),
    }),
});
exports.useGetAllContactsQuery = exports.contactApi.useGetAllContactsQuery, exports.useAddContactsMutation = exports.contactApi.useAddContactsMutation, exports.useDeleteContactMutation = exports.contactApi.useDeleteContactMutation, exports.useUpdateContactMutation = exports.contactApi.useUpdateContactMutation, exports.useLazyGetSingleContactQuery = exports.contactApi.useLazyGetSingleContactQuery;

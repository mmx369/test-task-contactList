import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IContact } from '../../types/contact'

export const contactApi = createApi({
  reducerPath: 'contactApi',
  tagTypes: ['Contacts', 'Contact'],
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as any).user.token
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  refetchOnFocus: true,
  endpoints: (build) => ({
    getSingleContact: build.query<IContact, string>({
      query: (id: string) => ({
        url: `api/contacts/${id}`,
      }),
      providesTags: (result, error, _id) => [{ type: 'Contact', _id }],
    }),
    getAllContacts: build.query<IContact[], string>({
      query: () => ({
        url: 'api/contacts',
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id }) => ({ type: 'Contacts' as const, _id })),
              { type: 'Contacts', id: 'LIST' },
            ]
          : [{ type: 'Contacts', id: 'LIST' }],
    }),
    addContacts: build.mutation({
      query: (body: IContact) => ({
        url: 'api/contacts',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    updateContact: build.mutation({
      query: (body: IContact) => ({
        url: 'api/contacts',
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
    deleteContact: build.mutation({
      query: (id: string) => ({
        url: `api/contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Contacts', id: 'LIST' }],
    }),
  }),
})

export const {
  useGetAllContactsQuery,
  useAddContactsMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useLazyGetSingleContactQuery,
} = contactApi

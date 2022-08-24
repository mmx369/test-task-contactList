import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { IContact } from '../../types/contact'

const initialState = null as unknown as IContact[]

export const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action: PayloadAction<IContact>) => {
      state = [...state, action.payload]
      return state
    },
  },
})

export const { addContact } = contactSlice.actions
export default contactSlice.reducer

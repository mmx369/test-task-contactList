import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { ITokenObject } from '../../types/token'

const initialState = null as unknown as ITokenObject | null

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<ITokenObject | null>) => {
      state = action.payload
      return state
    },
  },
})

export const { addUser } = tokenSlice.actions
export default tokenSlice.reducer

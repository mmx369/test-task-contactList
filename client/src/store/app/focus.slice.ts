import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = false

export const focusSlice = createSlice({
  name: 'focus',
  initialState,
  reducers: {
    changeFocus: (state, action: PayloadAction<boolean>) => {
      return action.payload
    },
  },
})

export const { changeFocus } = focusSlice.actions
export default focusSlice.reducer

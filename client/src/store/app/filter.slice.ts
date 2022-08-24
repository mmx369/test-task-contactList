import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeFilter: (state, action: PayloadAction<string>) => {
      return action.payload
    },
  },
})

export const { changeFilter } = filterSlice.actions
export default filterSlice.reducer

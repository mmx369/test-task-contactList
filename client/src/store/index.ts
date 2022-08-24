import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import userReducer from '../store/app/app.slice'
import contactReducer from '../store/app/contact.slice'
import filterReducer from '../store/app/filter.slice'
import focusReducer from '../store/app/focus.slice'
import { contactApi } from './app/app.api'

export const store = configureStore({
  reducer: {
    [contactApi.reducerPath]: contactApi.reducer,
    user: userReducer,
    contacts: contactReducer,
    focus: focusReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(contactApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

setupListeners(store.dispatch)

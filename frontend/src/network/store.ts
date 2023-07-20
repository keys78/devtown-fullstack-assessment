// import authReducer from '@/features/auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../reducers/auth/authSlice'
import notesReducer from '../reducers/private/notes/noteSlice'
import userReducer from '../reducers/private/user/userSlice'



export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: notesReducer,
    user: userReducer

  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
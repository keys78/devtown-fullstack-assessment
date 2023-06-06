import authReducer from '@/features/auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'



export const store = configureStore({
  reducer: {
        auth: authReducer,

      },
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
    })
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
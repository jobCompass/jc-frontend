import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './features/jobSlice'
import userReducer from './features/userSlice'
import detailReducer from './features/detailSlice'
import alertReducer from './features/alertSlice'
const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    users: userReducer,
    details: detailReducer,
    alert: alertReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from '../features/jobs/jobSlice'
import userReducer from '../features/users/userSlice'
import detailReducer from '../features/jobs/detailSlice'
import alertReducer from '../features/alert/alertSlice'
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
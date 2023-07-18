import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from '../features/jobs/jobSlice'
import userReducer from '../features/users/userSlice'
import detailReducer from '../features/details/detailSlice'
const store = configureStore({
  reducer: {
    jobs: jobsReducer,
    users: userReducer,
    details: detailReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store
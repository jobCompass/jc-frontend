import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface JobState {
  clickStatus: string,
  open: boolean
}

const initalState: JobState = { clickStatus:'', open:false, }

export const jobSlice = createSlice({
  name: 'addjob',
  reducers: {
    open: (state) => {
      console.log('in redux jobSlice: ', state)
      state.open = !state.open
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.clickStatus = action.payload.toUpperCase()
    },
  },
  initialState: initalState
})

export const {open, changeStatus} = jobSlice.actions
export const selectStatus = (state: RootState) => state.jobs.clickStatus
export const toggleOpen = (state: RootState) => state.jobs.open
export default jobSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { Obj, JobType } from '../../helpers/propTypes'
interface JobState {
  clickStatus: string,
  open: boolean,
  joblist: Obj
}

const initialState: JobState = { clickStatus:'', open:false, joblist:{}}

export const jobSlice = createSlice({
  name: 'addjob',
  reducers: {
    open: (state) => {
      state.open = !state.open
    },
    changeStatus: (state, action: PayloadAction<string>) => {
      state.clickStatus = action.payload.toUpperCase()
    },
    getJobList: (state, action:PayloadAction<Obj>) => {
      console.log('payload: ', action.payload)
      state.joblist = action.payload
    },
    addOneJob: (state, action:PayloadAction<JobType>) => {
      const list:string = action.payload.status
      const cur = state.joblist
      cur[list].push(action.payload)
      state.joblist = cur
    },
  },
  initialState,
})

export const {open, changeStatus, getJobList, addOneJob} = jobSlice.actions
export const selectStatus = (state: RootState) => state.jobs.clickStatus
export const toggleOpen = (state: RootState) => state.jobs.open
export default jobSlice.reducer
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { Obj, JobType } from '../../helpers/propTypes'
// import { Timestamp } from "firebase/firestore";
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
      state.joblist = action.payload
    },
    addOneJob: (state, action:PayloadAction<JobType>) => {
      const newJob = action.payload
      const cur = {...state.joblist}
      cur[newJob.status].push(action.payload)
      state.joblist = cur
    },
    dragJob: (state, action: PayloadAction<{index: number,status:string, target: string, updated: JobType}>) => {
      const {index, status, target, updated} = action.payload
      const cur = {...state.joblist}
      cur[status].splice(index, 1)
      cur[target].unshift(updated)
      state.joblist = cur
    },
    updateOneJob:(state, action:PayloadAction<JobType>) => {
      const job = action.payload
      const cur = {...state.joblist}
      const index = cur[job.status].findIndex(x => x.id == job.id)
      cur[job.status][index] = job
      state.joblist = cur
    },
    deleteJob:(state, action:PayloadAction<{index:number, status:string}>) => {
      const {index, status} = action.payload
      const cur = {...state.joblist}
      cur[status].splice(index, 1)
      state.joblist=cur
    }
  },
  initialState,
})

export const {open, changeStatus, getJobList, addOneJob, dragJob, updateOneJob, deleteJob} = jobSlice.actions
export const selectStatus = (state: RootState) => state.jobs.clickStatus
export const toggleOpen = (state: RootState) => state.jobs.open
export default jobSlice.reducer
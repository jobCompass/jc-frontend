import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Obj, JobType } from '../../helpers/propTypes'
import { APPLY_STATUS } from '../../const/const'
// import { Timestamp } from "firebase/firestore";
interface JobState {
  clickStatus: string,
  open: boolean,
  origin:Obj,
  joblist: Record<string, JobType[]>,
}

const initialState: JobState = { clickStatus:'', open:false, origin:{}, joblist:{'saved':[], 'applied':[], 'reject':[], 'screen':[], 'tech interview':[], 'final interview':[], 'offered':[]}}

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
      state.origin = action.payload;
      state.joblist = action.payload
    },
    addOneJob: (state, action:PayloadAction<JobType>) => {
      const newJob = action.payload
      let cur = {...state.joblist}
      if (JSON.stringify(cur) === '{}') {
        cur = {[APPLY_STATUS.SAVED]:[], [APPLY_STATUS.APPLIED]:[], 'reject':[], 'screen':[], 'tech interview':[], 'final interview':[], 'offered':[]};
      }
      cur[newJob.status].push(action.payload)
      state.origin = cur;
      state.joblist = cur
    },
    dragJob: (state, action: PayloadAction<{index: number,status:string, target: string, updated: JobType}>) => {
      const {index, status, target, updated} = action.payload
      const cur = {...state.joblist}
      cur[status].splice(index, 1)
      cur[target].unshift(updated)
      state.origin = cur;
      state.joblist = cur
    },
    updateOneJob:(state, action:PayloadAction<JobType>) => {
      const job = action.payload
      const cur = {...state.joblist}
      const index = cur[job.status].findIndex(x => x.id == job.id)
      cur[job.status][index] = job
      state.origin = cur;
      state.joblist = cur
    },
    deleteJob:(state, action:PayloadAction<{index:number, status:string}>) => {
      const {index, status} = action.payload
      const cur = {...state.joblist}
      cur[status].splice(index, 1)
      state.joblist=cur
    },
    searchJobs: (state, action:PayloadAction<string>) => {
      const keyword = action.payload.toLowerCase();
      const cur = {...state.origin};
      const filtered = {...state.joblist};
      for (const key in cur) {
        filtered[key] = cur[key].filter(job => {
          if (job.company.toLowerCase().includes(keyword) || job.title.toLowerCase().includes(keyword)) {
            return job;
          }
        })
      }
      state.joblist = filtered;
    },
  },
  initialState,
})

export const {open, changeStatus, getJobList, addOneJob, dragJob, updateOneJob, deleteJob, searchJobs} = jobSlice.actions
export default jobSlice.reducer
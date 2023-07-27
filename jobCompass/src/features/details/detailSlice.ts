import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { JobType } from '../../helpers/propTypes'

interface DetailState {
  open: boolean,
  job: JobType
}

const initialState: DetailState = {open:false, job:{company:'', title:'', status:'', timeline:{},}}

export const detailSlice = createSlice({
  name:'jobDetail',
  initialState,
  reducers: {
    toggle: (state) => {
      state.open = !state.open
    },
    setJob: (state, action:PayloadAction<JobType>) => {
      state.job = action.payload
    },

  }
})

export const {toggle, setJob} = detailSlice.actions
export const curJob = (state: RootState) => state.details.job
export default detailSlice.reducer
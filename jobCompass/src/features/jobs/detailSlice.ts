import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'
import { JobType } from '../../helpers/propTypes'

interface DetailState {
  open: boolean,
  job: JobType,
  index: number
}

const initialState: DetailState = {open:false, index:-1, job:{company:'', title:'', status:'', timeline:{}, bgColor:'#f5f6f7'}}

export const detailSlice = createSlice({
  name:'jobDetail',
  initialState,
  reducers: {
    toggle: (state) => {
      state.open = !state.open
    },
    setJob: (state, action:PayloadAction<{index: number, job:JobType}>) => {
      state.job = action.payload.job
      state.index = action.payload.index
    },

  }
})

export const {toggle, setJob} = detailSlice.actions
export const curJob = (state: RootState) => state.details.job
export default detailSlice.reducer
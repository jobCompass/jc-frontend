import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

interface UserState {
  id: string
}

const initialState: UserState = { id: ""}

export const userSlice = createSlice({
  name:'user',
  initialState,
  reducers: {
    addId:(state, action: PayloadAction<string>) => {
      state.id = action.payload
    },
    deleteId: (state) => {
      state.id = ''
    }
  }
})

export const {addId, deleteId} = userSlice.actions
export const curId = (state:RootState) => state.users.id
export default userSlice.reducer
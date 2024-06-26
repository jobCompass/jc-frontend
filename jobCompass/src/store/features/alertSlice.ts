/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AlertProps } from '../../helpers/propTypes'

const initialState: {open: boolean, alert:AlertProps} = {open: false, alert: {type:"", title: "", message:""}}

export const alertSlice = createSlice({
  name:'alert',
  initialState,
  reducers: {
    toggleAlert: (state) => {
      state.open = !state.open
    },
    setAlert: (state, action: PayloadAction<AlertProps>) => {
      state.alert = action.payload
    }
  }
})

export const {toggleAlert, setAlert} = alertSlice.actions
export default alertSlice.reducer
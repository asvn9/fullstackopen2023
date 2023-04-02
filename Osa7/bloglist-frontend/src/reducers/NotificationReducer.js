import { createSlice } from '@reduxjs/toolkit'

const notifySlice = createSlice({
  name: 'notification',
  initialState: '',
  reducers: {
    showNotification(state, action) {
      return action.payload
    },
    hideNotification(state, action) {
      return ''
    }
  }
})

export const { showNotification, hideNotification } = notifySlice.actions

export const setNotification = (message, timeout) => (dispatch) => {
  dispatch(showNotification(message))
  setTimeout(() => {
    dispatch(hideNotification())
  }, timeout * 1000)
}

export default notifySlice.reducer

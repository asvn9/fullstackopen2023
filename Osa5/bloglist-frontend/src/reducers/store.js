import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './NotificationReducer'
import blogReducer from './BlogReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
  },
})

export default store

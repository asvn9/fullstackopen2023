import {configureStore} from '@reduxjs/toolkit'
import anecReducer from './anecdoteReducer'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'

const store = configureStore({
    reducer: {
      anecdotes : anecReducer,
      filter: filterReducer,
      notification: notificationReducer
    }
  })

  export default store
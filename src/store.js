import { configureStore } from '@reduxjs/toolkit'
import { rootReducer } from './reducers'

const reducer = rootReducer
export const store = configureStore({
  reducer
})
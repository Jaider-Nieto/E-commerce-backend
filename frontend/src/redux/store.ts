import { configureStore } from '@reduxjs/toolkit'
import userSlides from './userSlides'

export const store = configureStore({
  reducer: {
    user: userSlides
  }
})

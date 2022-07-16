import { configureStore } from '@reduxjs/toolkit'
import memorySlice from './Slice/memoryCatSlice'

export default configureStore({
  reducer: {
    memory: memorySlice
  }
})
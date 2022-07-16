import { createSlice } from '@reduxjs/toolkit'

export const memorySlice = createSlice({
  name: 'memoria',
  initialState: {
    catsClicked: []
  },
  reducers: {
    memoryCatReducer: (state, action) => {
        return{
            ...state,
            catsClicked: [...state.catsClicked,action.payload]
        }
    },
  }
})

// Action creators are generated for each case reducer function
export const { memoryCatReducer} = memorySlice.actions

export default memorySlice.reducer
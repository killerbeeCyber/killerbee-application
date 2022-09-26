import { createSlice } from '@reduxjs/toolkit'

export const procedesSlice = createSlice({
  name: 'procedes',
  initialState: {
    value: [],
  },
  reducers: {
    add: (state, action) => {
      state.value = [...state.value, action.payload]
    },
    set: (state, action) => {
      state.value = [...action.payload]
    },
    remove: (state, action) => {
      state.value = state.value.filter(
        (element) => element._id != action.payload._id
      )
    },
    update: (state, action) => {
      const procedeIndex = state.value.findIndex(
        (element) => element._id == action.payload._id
      )
      state.value[procedeIndex] = action.payload
      //state.value = [...state.value]
    },
  },
})

export const { add, set, remove, update } = procedesSlice.actions
export const selectProcedes = (state) => state.procedes.value

export default procedesSlice.reducer
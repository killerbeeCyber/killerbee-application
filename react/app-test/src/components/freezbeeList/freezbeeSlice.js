import { createSlice } from '@reduxjs/toolkit'

export const freezbeesSlice = createSlice({
  name: 'freezbees',
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
      const freezbeeIndex = state.value.findIndex(
        (element) => element._id == action.payload._id
      )
      state.value[freezbeeIndex] = action.payload
      //state.value = [...state.value]
    },
  },
})

export const { add, set, remove, update } = freezbeesSlice.actions
export const selectFreezbees = (state) => state.freezbees.value

export default freezbeesSlice.reducer
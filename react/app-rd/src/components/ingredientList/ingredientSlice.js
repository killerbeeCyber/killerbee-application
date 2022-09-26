import { createSlice } from '@reduxjs/toolkit'

export const ingredientsSlice = createSlice({
  name: 'ingredients',
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
      const ingredientIndex = state.value.findIndex(
        (element) => element._id == action.payload._id
      )
      state.value[ingredientIndex] = action.payload
      //state.value = [...state.value]
    },
  },
})

export const { add, set, remove, update } = ingredientsSlice.actions
export const selectIngredients = (state) => state.ingredients.value

export default ingredientsSlice.reducer
import { configureStore } from '@reduxjs/toolkit'
import freezbeesSlice from './components/freezbeeList/freezbeeSlice'
import ingredientSlice from './components/ingredientList/ingredientSlice'
import procedeSlice from './components/procedeList/procedeSlice'

export default configureStore({
  reducer: {
    freezbees: freezbeesSlice,
    ingredients : ingredientSlice,
    procedes : procedeSlice
  },
})
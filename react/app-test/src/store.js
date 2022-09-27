import { configureStore } from '@reduxjs/toolkit'
import freezbeesSlice from './components/freezbeeList/freezbeeSlice'
import procedeSlice from './components/procedeList/procedeSlice'
import ingredientSlice from './components/ingredientList/ingredientSlice'
export default configureStore({
  reducer: {
    freezbees: freezbeesSlice,
    ingredients : ingredientSlice,
    procedes : procedeSlice
  },
})
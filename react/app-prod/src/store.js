import { configureStore } from '@reduxjs/toolkit'
import freezbeesSlice from './components/freezbeeList/freezbeeSlice'

export default configureStore({
  reducer: {
    freezbees: freezbeesSlice,
  },
})
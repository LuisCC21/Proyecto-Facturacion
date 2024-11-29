import { configureStore } from '@reduxjs/toolkit'
import facturaSlice from './factura/facturaSlice'

export const store = configureStore({
  reducer: {
    factura: facturaSlice.reducer,
  },
})

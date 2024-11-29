import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products: [],
  infoUser: {},
  isLoading: false,
}

export const facturaSlice = createSlice({
  name: 'factura',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const existingProductIndex = state.products.findIndex(
        (product) => product.id === action.payload.id
      )

      if (existingProductIndex !== -1) {
        // Si el producto ya existe, actualiza ese producto en el array
        state.products[existingProductIndex] = action.payload
      } else {
        // Si el producto no existe, agrégalo al array
        state.products.push(action.payload)
      }
    },

    clearProducts: (state) => {
      state.products = []
    },
    addInfoUser: (state, action) => {
      state.infoUser = action.payload
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { addProduct, addInfoUser, setIsLoading, clearProducts } =
  facturaSlice.actions

export default facturaSlice

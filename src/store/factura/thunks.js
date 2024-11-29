import { addProduct } from './facturaSlice'

export const AddProductInCart = (product) => {
  return async (dispatch, getState) => {
    // Hacer peticion al backend

    dispatch(addProduct(product))
  }
}

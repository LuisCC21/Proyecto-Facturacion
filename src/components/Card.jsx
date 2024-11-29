import { useState } from 'react'
import { AddProductInCart } from '../store/factura/thunks'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import Swal from 'sweetalert2'
import toast from 'react-hot-toast'

export const Card = ({ product }) => {
  const [count, setCount] = useState(0)
  const dispatch = useDispatch()

  const formatter = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'USD',
  })

  const handleAddProduct = () => {
    if (count === 0) {
      Swal.fire('Error', `Selecciona una cantidad mayor a 0`, 'error')
    }
    dispatch(AddProductInCart({ ...product, quantity: count }))
    toast.success('Producto Agregado Correctamente', {
      position: 'botton-right',
      icon: '👏',
    })
  }
  const handleCounter = (value) => {
    if (product.cantidad_disponible === count && value !== -1) {
      return Swal.fire(
        'Error',
        `Cantidad maxima de <b>${product.name}</b> alcanzada`,
        'error'
      )
    }
    if (count === 0 && value < 1) return
    setCount((preValue) => preValue + value)
  }

  return (
    <>
      <div className='card container-fluid ml-4 py-3 shadow mt-lg-0 mt-5  '>
        {product.descuento > 0 && (
          <div className='border border-danger rounded-circle circle p-1 position-absolute bg-danger text-white  text-center'>
            <small className='font-weight-bold'>
              {product.descuento * 100} %
            </small>
          </div>
        )}
        <div className='text-center hover-img'>
          <img
            src={product.img}
            className='card-img-top w-50'
            alt={product.name}
            height={155}
          />
        </div>
        <div className='card-body'>
          <h5 className='card-title font-italic text-secondary'>
            {product.name}
          </h5>
          <p className='card-text font-italic  text-muted'>
            Precio:{' '}
            <span className='font-weight-bold text-dark'>
              {formatter.format(product.price)}
            </span>
          </p>

          <div
            className='d-flex aling-items-center justify-content-center'
            style={{ height: '30px' }}
          >
            <FontAwesomeIcon
              icon={faMinus}
              className={`btn  mr-2 rounded h-25 mt-1 ${
                count === 0 ? 'btn-secondary' : 'btn-info'
              }`}
              size='xl'
              onClick={() => handleCounter(-1)}
            />
            <input
              type='text'
              value={count}
              readOnly
              className='w-25 rounded form-control-sm '
            />

            <FontAwesomeIcon
              icon={faPlus}
              className={`btn  ml-2 rounded h-25 mt-1 ${
                product.cantidad_disponible === count
                  ? 'btn-secondary'
                  : 'btn-info'
              }`}
              onClick={() => handleCounter(+1)}
            />
          </div>

          <button
            className='btn btn-primary w-100 mt-2'
            onClick={handleAddProduct}
          >
            Add
          </button>
        </div>
      </div>
    </>
  )
}

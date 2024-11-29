import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'

export const Cart = () => {
  const { products } = useSelector((state) => state.factura)

  const cantProducts = products.reduce((total, currentValue) => {
    return total + currentValue.quantity
  }, 0)

  return (
    <div className='mr-5'>
      <FontAwesomeIcon icon={faCartShopping} />
      <span className='badge badge-success position-absolute'>
        {cantProducts}
      </span>
    </div>
  )
}

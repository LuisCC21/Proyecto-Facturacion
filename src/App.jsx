import { useNavigate } from 'react-router-dom'
import { Card } from './components/Card'
import { Cart } from './components/Cart'
import { useEffect, useState } from 'react'
import { addInfoUser } from './store/factura/facturaSlice'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { Toaster } from 'react-hot-toast'

function App() {
  const [nombre, setNombre] = useState('')
  const [rtn, setRtn] = useState('')
  const [products, setProducts] = useState([])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { products: productsStore } = useSelector((state) => state.factura)

  const goToFactura = () => {
    if (productsStore.length === 0) {
      return Swal.fire('Error', ' No hay productos agregados!', 'error')
    }
    if (nombre.trim().length < 4) {
      return Swal.fire(
        'Error',
        'El nombre tiene que tener al menos 4 caracteres',
        'error'
      )
    }
    if (rtn.trim().length < 8) {
      return Swal.fire(
        'Error',
        'El RTN tiene que tener al menos 8 caracteres',
        'error'
      )
    }
    if (!nombre && !rtn) {
      return Swal.fire(
        'Error',
        ' <b>Nombre y RTN son obligatorios</b>',
        'error'
      )
    }

    dispatch(addInfoUser({ nombre, rtn }))
    navigate('/factura')
  }
  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/productos/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data)
      })
  }, [])

  return (
    <div className='container mt-3'>
      <div className='input-group my-3 row ml-md-4'>
        <div className='d-flex mr-5  col-12 col-md-7'>
          <span className='input-group-text ' id='input'>
            Nombre Completo
          </span>

          <input
            type='text'
            className='form-control'
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className='d-flex mt-3  mt-md-0 col-12 col-md-4'>
          <span className='input-group-text ' id='input'>
            RTN
          </span>

          <input
            type='number'
            className='form-control  '
            value={rtn}
            onChange={(e) => setRtn(e.target.value)}
          />
        </div>
      </div>

      <div className=' mt-5 d-flex align-items-center justify-content-around flex-column flex-lg-row '>
        {products.map((product) => (
          <Card product={product} key={product.id} />
        ))}
      </div>

      <div>
        <div className='container mt-5 d-flex align-items-center justify-content-center'>
          <div className=' d-flex align-items-center justify-content-center mr-5 '>
            <Cart />
            <button
              className={`btn ml-5 ${
                productsStore.length > 0 ? 'btn-primary' : 'btn-secondary'
              }`}
              onClick={goToFactura}
            >
              Generar Factura
            </button>
          </div>
          <div>
            <button
              className='btn btn-primary ml-5'
              onClick={() => navigate('/facturas')}
            >
              Ver Facturas
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  )
}

export default App

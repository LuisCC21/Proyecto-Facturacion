import { useDispatch, useSelector } from 'react-redux'
import { format } from 'date-fns'
import { Toaster } from 'react-hot-toast'
import { saveFactura } from '../api/saveFactura'
import { useNavigate } from 'react-router-dom'
import { clearProducts } from '../store/factura/facturaSlice'
import { generarNumeroFactura } from '../utils/generatNumFactura'

export const Factura = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { products, infoUser } = useSelector((state) => state.factura)
  const ISV = 0.15
  let subtotal = 0
  let totalISV = 0
  let total = 0
  const num_factura = generarNumeroFactura()

  const formatter = new Intl.NumberFormat('es', {
    style: 'currency',
    currency: 'USD',
  })
  const getTodayDate = () => {
    const today = new Date()
    return format(today, 'MM/dd/yyyy')
  }

  const onSaveFactura = async () => {
    const facturaData = {
      nombre_cliente: infoUser.nombre,
      num_factura,
      RTN_cliente: infoUser.rtn,
      importe_gravado: 0,
      importe_exonerado: 0,
      ISV_15: totalISV.toFixed(2),
      sub_total: subtotal.toFixed(2),
      productos: JSON.stringify(products),
      total_pagar: total.toFixed(2),
    }

    await saveFactura(facturaData)
    setTimeout(() => {
      navigate('/')
      dispatch(clearProducts())
    }, 1000)
  }

  const goBack = () => {
    dispatch(clearProducts())
    navigate('/')
  }

  return (
    <>
      <button
        className='btn btn-primary rounded  position-absolute ml-5  '
        onClick={goBack}
      >
        Back
      </button>
      <div className='border container p-2 mt-3'>
        <div className='row d-flex align-items-center '>
          <div className='col-9 d-flex align-items-center justify-content-center'>
            <h2 className='font-weight-bold text-blue'>Factura</h2>
            <p className='m-0 ml-5'>
              <b>RTN:</b> 0801-900-3249605{' '}
            </p>
            <p className='m-0 ml-4'>
              <b> Factura Nº </b> {num_factura}
            </p>
          </div>
          <img
            src='/src/assets/logo_farinter.PNG'
            alt='Logo'
            width={200}
            className='rounded'
          />
        </div>
        <div className='d-flex flex-column'>
          <div className='d-flex'>
            <span className='font-weight-bold mr-2'>Nombre Cliente: </span>
            <p> {infoUser.nombre}</p>
          </div>
          <div className='d-flex'>
            <span className='font-weight-bold mr-2'>RTN / Identidad: </span>
            <p> {infoUser.rtn}</p>
          </div>
          <div className='d-flex'>
            <span className='font-weight-bold mr-2'>Fecha Emitida: </span>
            <p> {getTodayDate()}</p>
          </div>
        </div>
        <table className='table'>
          <thead>
            <tr>
              <th scope='col'>Cantidad</th>
              <th scope='col'>Descripcion</th>
              <th scope='col'>Precio Unitario</th>
              <th scope='col'>Subtotal</th>
              <th scope='col'>Descuentos</th>
              <th scope='col'>Total</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              const subTotal = product.price * product.quantity
              const discount = subTotal * product.descuento

              const totalProduct = subTotal - discount
              subtotal += totalProduct
              totalISV = subtotal * ISV
              total = subtotal + subtotal * ISV

              return (
                <tr key={product.id}>
                  <td>{product.quantity}</td>
                  <td>{product.name}</td>
                  <td>{formatter.format(product.price)}</td>
                  <td>{formatter.format(subTotal)}</td>
                  <td>{formatter.format(discount)}</td>
                  <td>{formatter.format(totalProduct)}</td>
                </tr>
              )
            })}
            <tr className=''>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th>Sub Total</th>
              <td>{formatter.format(subtotal)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th>Importe Agravado</th>
              <td>{formatter.format(0)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th>Importe Exonerado</th>
              <td>{formatter.format(0)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th>ISV 15%</th>
              <td>{formatter.format(totalISV)}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <th>Total a Pagar</th>
              <th>{formatter.format(total)}</th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className='container mt-4 mb-5'>
        <button className='btn btn-primary' onClick={onSaveFactura}>
          Guardar Factura
        </button>
      </div>
      <Toaster />
    </>
  )
}

import { useEffect, useState } from 'react'
import { TableFactura } from '../components/TableFactura'
import { useNavigate } from 'react-router-dom'

export const FacturasList = () => {
  const [facturas, setFacturas] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${import.meta.env.VITE_BACKEND_URL}/factura/`)
      .then((response) => response.json())
      .then((data) => {
        setFacturas(data)
      })
  }, [])

  return (
    <>
      <h1 className='text-center font-weight-bold font-italic '>Facturas</h1>

      <button
        className='btn btn-primary rounded  position-absolute ml-5  '
        onClick={() => navigate('/')}
      >
        Back
      </button>

      {facturas.map((factura) => {
        return <TableFactura key={factura.id} factura={factura} />
      })}
    </>
  )
}

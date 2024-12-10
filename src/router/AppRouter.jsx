import { Navigate, Route, Routes } from 'react-router-dom'
import App from '../App'
import { Factura } from '../pages/Factura'
import { FacturasList } from '../pages/FacturasList'

export const AppRouter = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/factura' element={<Factura />} />
        <Route path='/facturas' element={<FacturasList />} />
        
        
        <Route path='*' element={<Navigate to={'/'} />} />
        <Route path='/*' element={<Navigate to={'/'} />} />
      </Routes>
    </>
  )
}

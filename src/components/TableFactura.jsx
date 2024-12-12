import { format, parseISO } from 'date-fns';


export const TableFactura = ({ factura }) => {
    const products = JSON.parse(factura.productos)
    const formatter = new Intl.NumberFormat('es', {
        style: 'currency',
        currency: 'USD',
    })
    const fechaObjeto = parseISO(factura.fecha_emitida);
    const fechaFormateada = format(fechaObjeto, 'dd/MM/yyyy');


    return (
        <>

            <div className='border container p-2 mt-3 mb-5'>
                <div className='row d-flex align-items-center '>
                    <div className='col-9 d-flex align-items-center justify-content-center'>
                        <h2 className='font-weight-bold text-blue'>Factura</h2>
                        <p className='m-0 ml-5'>
                            <b>RTN:</b> {factura.RTN_empresa}{' '}
                        </p>
                        <p className='m-0 ml-4'>
                            <b> Factura Nº </b> {factura.num_factura}
                        </p>
                    </div>
                    <img
                        src='assets/logo_farinter.PNG'
                        alt='Logo'
                        width={200}
                        className='rounded'
                    />
                </div>
                <div className='d-flex flex-column'>
                    <div className='d-flex'>
                        <span className='font-weight-bold mr-2'>Nombre Cliente: </span>
                        <p> {factura.nombre_cliente}</p>
                    </div>
                    <div className='d-flex'>
                        <span className='font-weight-bold mr-2'>RTN / Identidad: </span>
                        <p> {factura.RTN_cliente}</p>
                    </div>
                    <div className='d-flex'>
                        <span className='font-weight-bold mr-2'>Fecha Emitida: </span>
                        <p> {fechaFormateada}</p>
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
                            const discount = product.descuento * subTotal

                            return (
                                <tr key={product.id}>
                                    <td>{product.quantity}</td>
                                    <td>{product.name}</td>
                                    <td>{formatter.format(product.price)}</td>
                                    <td>{formatter.format(subTotal)}</td>
                                    <td>{formatter.format(discount)}</td>
                                    <td>{formatter.format(subTotal - discount)}</td>
                                </tr>
                            )
                        })}
                        <tr className=''>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <th>Sub Total</th>
                            <td>{formatter.format(factura.sub_total)}</td>
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
                            <td>{formatter.format(factura.ISV_15)}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <th>Total a Pagar</th>
                            <th>{formatter.format(factura.total_pagar)}</th>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    )
}

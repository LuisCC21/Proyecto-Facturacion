export const generarNumeroFactura = () => {
  const fecha = new Date()
  const año = fecha.getFullYear()
  const mes = (fecha.getMonth() + 1).toString().padStart(2, '0')

  const numeroSerie = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(8, '0')

  const numeroFactura = `${año}-${mes}-${numeroSerie}`

  return numeroFactura
}

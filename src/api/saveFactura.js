import toast from 'react-hot-toast'

export const saveFactura = async (facturaData) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/factura/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(facturaData),
      }
    )
    await response.json()

    toast.success('Factura Agregada Correctamente', {
      position: 'botton-right',
      icon: '👏',
      duration: 6000,
    })
  } catch (error) {
    console.error('Error al guardar la factura:', error)
  }
}

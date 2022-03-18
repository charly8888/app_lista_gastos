import React, { useEffect, useState } from 'react'
import useObtenerGastosDelMes from './useObtenerGastosDelMes'

export default function useObtenerGastosDelMesPorCategoria() {
  const [gastosDelMes] = useObtenerGastosDelMes()

  let gastosPorCategoria = {
    comida: 0,
    'cuentas y pagos': 0,
    hogar: 0,
    transporte: 0,
    ropa: 0,
    'salud e higiene': 0,
    compras: 0,
    diversion: 0,
  }

  gastosDelMes.forEach((gasto) => {
    const categoria = gasto.categoria
    gastosPorCategoria[categoria] += gasto.cantidad
  })

  return gastosPorCategoria
}

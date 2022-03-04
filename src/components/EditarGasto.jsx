import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contextos/AuthContext'

const EditarGasto = () => {
  const { usuario } = useAuth()
  if (usuario) {
    return <h1>Editar Gasto</h1>
  } else {
    return <Navigate to="/iniciar-sesion" />
  }
}

export default EditarGasto

import React from 'react'
import Helmet from 'react-helmet'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contextos/AuthContext'
import BtnRegresar from '../elements/BtnRegresar'
import { Header, Titulo } from '../elements/Header'
import BarraTotalGastado from './BarraTotalGastado'
import FormularioGasto from './FormularioGasto'
import { useParams } from 'react-router-dom'
import { useObtenerGasto } from '../hooks/useObtenerGasto'

const EditarGasto = () => {
  const { usuario } = useAuth()
  if (usuario) {
    const { id } = useParams()
    const [gasto, idGasto] = useObtenerGasto(id)
    return (
      <>
        <Helmet>
          <title>Editar Gasto</title>
        </Helmet>
        <Header>
          <BtnRegresar ruta="/lista" />
          <Titulo>Editar Gasto</Titulo>
        </Header>
        <FormularioGasto gasto={gasto} idGasto={idGasto} />
        <BarraTotalGastado />
      </>
    )
  } else {
    return <Navigate to="/iniciar-sesion" />
  }
}

export default EditarGasto

import { Helmet } from 'react-helmet'
import { Header, Titulo } from '../elements/Header'
import BtnRegresar from '../elements/BtnRegresar'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contextos/AuthContext'
import BarraTotalGastado from './BarraTotalGastado'

const GastosPorCategoria = () => {
  const { usuario } = useAuth()
  if (usuario) {
    return (
      <>
        <Helmet>
          <title>Gastos por Categoría</title>
        </Helmet>
        <Header>
          <BtnRegresar />
          <Titulo>Gastos por Categoría</Titulo>
        </Header>
        <BarraTotalGastado />
      </>
    )
  } else {
    return <Navigate to="/iniciar-sesion" />
  }
}

export default GastosPorCategoria

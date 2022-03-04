import { Helmet } from 'react-helmet'
import { Header, Titulo } from '../elements/Header'
import BtnRegresar from '../elements/BtnRegresar'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contextos/AuthContext'
// import { useAuth } from '../contextos/AuthContext'

const ListaDeGastos = () => {
  const { usuario } = useAuth()
  if (usuario) {
    return (
      <>
        <Helmet>
          <title>Lista de Gastos</title>
        </Helmet>
        <Header>
          <BtnRegresar />
          <Titulo>Lista de Gastos</Titulo>
        </Header>
      </>
    )
  } else {
    return <Navigate to="/iniciar-sesion" />
  }
}

export default ListaDeGastos

import { Helmet } from 'react-helmet'
import {
  Header,
  Titulo,
  ContenedorBotones,
  ContenedorHeader,
} from './elements/Header'
import Boton from './elements/Boton'
import BotonCerrarSesion from './elements/BotonCerrarSesion'
import { useAuth } from './contextos/AuthContext'
import { Navigate, useNavigate } from 'react-router-dom'
import FormularioGasto from './components/FormularioGasto'
import BarraTotalGastado from './components/BarraTotalGastado'

const App = () => {
  
  const { usuario } = useAuth()
  if (usuario) {
    return(
    <>
      <Helmet>
        <title>Agregar Gasto</title>
      </Helmet>
      <Header>
        <ContenedorHeader>
          <Titulo>agregar gasto</Titulo>
          <ContenedorBotones>
            <Boton to="/categorias">Categorias</Boton>
            <Boton to="/lista">Lista de gastos</Boton>
            <BotonCerrarSesion />
          </ContenedorBotones>
        </ContenedorHeader>
      </Header>
      <FormularioGasto />
      <BarraTotalGastado />
    </>
  )
} else {
  return <Navigate to='/iniciar-sesion' />
}
}

export default App

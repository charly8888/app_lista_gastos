import { Helmet } from 'react-helmet'
import { Header, Titulo } from '../elements/Header'
import BtnRegresar from '../elements/BtnRegresar'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../contextos/AuthContext'
import BarraTotalGastado from './BarraTotalGastado'
import useObtenerGastosDelMesPorCategoria from '../hooks/useObtenerGastosDelMesPorCategoria'
import {
  ListaDeCategorias,
  ElementoListaCategorias,
  Categoria,
  Valor,
} from '../elements/ElementosDeLista'
import IconoCategoria from '../elements/IconoCategoria'
import formatearCantidad from '../functions/convertirAMoneda'

const GastosPorCategoria = () => {
  const { usuario } = useAuth()
  if (usuario) {
    const gastosPorCategoria = useObtenerGastosDelMesPorCategoria()
    console.log(gastosPorCategoria)
    return (
      <>
        <Helmet>
          <title>Gastos por Categoría</title>
        </Helmet>
        <Header>
          <BtnRegresar />
          <Titulo>Gastos por Categoría</Titulo>
        </Header>
        <ListaDeCategorias>
          {Object.keys(gastosPorCategoria).map((key) => {
            let valor = gastosPorCategoria[key]

            return (
              <ElementoListaCategorias key={key}>
                <Categoria>
                  <IconoCategoria id={key} />
                  {key}
                </Categoria>
                <Valor>${formatearCantidad(valor)}</Valor>
              </ElementoListaCategorias>
            )
          })}
        </ListaDeCategorias>
        <BarraTotalGastado />
      </>
    )
  } else {
    return <Navigate to="/iniciar-sesion" />
  }
}

export default GastosPorCategoria

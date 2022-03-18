import { Helmet } from 'react-helmet'
import { Header, Titulo } from '../elements/Header'
import BtnRegresar from '../elements/BtnRegresar'
import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../contextos/AuthContext'
import BarraTotalGastado from './BarraTotalGastado'
import useObtenerGastos from '../hooks/useObtenerGastos'
import {
  Lista,
  ElementoLista,
  Categoria,
  Descripcion,
  Valor,
  Fecha,
  ContenedorBotones,
  BotonAccion,
  BotonCargarMas,
  ContenedorBotonCentral,
  ContenedorSubtitulo,
  Subtitulo,
} from '../elements/ElementosDeLista'
import IconoCategoria from '../elements/IconoCategoria'
import formatearCantidad from '../functions/convertirAMoneda'
import { ReactComponent as IconoEditar } from '../images/editar.svg'
import { ReactComponent as IconoBorrar } from '../images/borrar.svg'
import Boton from '../elements/Boton'
import { format, fromUnixTime } from 'date-fns'
import { es } from 'date-fns/locale'
import { borrarGasto } from '../firebase/BorrarGasto'

const ListaDeGastos = () => {
  const [gastos, obtenerMasGastos, hayMasPorCargar] = useObtenerGastos()

  const formatearFecha = (fecha) => {
    return format(fromUnixTime(fecha), "dd 'de' MMMM 'de' yyyy", { locale: es })
  }
  const fechaEsIgual = (gastos, i, gasto) => {
    return (
      i !== 0 &&
      formatearFecha(gasto.fecha) == formatearFecha(gastos[i - 1].fecha) &&
      true
    )
  }

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
        <Lista>
          {gastos.map((gasto, i) => {
            return (
              <div key={gasto.id}>
                {!fechaEsIgual(gastos, i, gasto) && (
                  <Fecha>{formatearFecha(gasto.fecha)}</Fecha>
                )}
                <ElementoLista key={gasto.id}>
                  <Categoria>
                    <IconoCategoria id={gasto.categoria} />
                    {gasto.categoria}
                  </Categoria>
                  <Descripcion>{gasto.descripcion}</Descripcion>
                  <Valor>{formatearCantidad(gasto.cantidad)}</Valor>
                  <ContenedorBotones>
                    <BotonAccion as={Link} to={`/editar/${gasto.id}`}>
                      <IconoEditar />
                    </BotonAccion>
                    <BotonAccion onClick={() => borrarGasto(gasto.id)}>
                      <IconoBorrar />
                    </BotonAccion>
                  </ContenedorBotones>
                </ElementoLista>
              </div>
            )
          })}
          {hayMasPorCargar && (
            <ContenedorBotonCentral>
              <BotonCargarMas onClick={() => obtenerMasGastos()}>
                Cargar más
              </BotonCargarMas>
            </ContenedorBotonCentral>
          )}
          {gastos.length === 0 && (
            <ContenedorSubtitulo>
              <Subtitulo>No hay gastos por mostrar</Subtitulo>
              <Boton as={Link} to="/">
                Agregar gasto{' '}
              </Boton>
            </ContenedorSubtitulo>
          )}
        </Lista>
        <BarraTotalGastado />
      </>
    )
  } else {
    return <Navigate to="/iniciar-sesion" />
  }
}

export default ListaDeGastos

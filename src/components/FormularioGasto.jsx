import {
  ContenedorFiltros,
  Formulario,
  Input,
  InputGrande,
  ContenedorBoton,
} from '../elements/ElementosDeFormularios'
import React, { useState, useEffect } from 'react'
import Boton from '../elements/Boton'
import { ReactComponent as IconoPlus } from '../images/plus.svg'
import SelectCategorias from './SelectCategorias'
import { DatePicker } from './DatePicker'
import agregarGasto from '../firebase/agregarGasto'
import getUnixTime from 'date-fns/getUnixTime'
import fromUnixTime from 'date-fns/fromUnixTime'
import { useAuth } from '../contextos/AuthContext'
import Alerta from '../elements/Alerta'
import { useNavigate } from 'react-router-dom'
import editarGasto from '../firebase/editarGasto'

const FormularioGasto = ({ gasto, idGasto }) => {
  const [inputDescricion, setInputDescricion] = useState('')
  const [inputCantidad, setInputCantidad] = useState('')
  const [categoria, setCategoria] = useState('hogar')
  const [fecha, setFecha] = useState(new Date())
  const [estadoAlerta, setEstadoAlerta] = useState(false)
  const [alerta, setAlerta] = useState({})
  const { usuario } = useAuth()
  const navigate = useNavigate()
  useEffect(() => {
    if (gasto) {
      if (gasto.usuario === usuario.uid) {
        console.log(gasto)
        setCategoria(gasto.categoria)
        setInputDescricion(gasto.descripcion)
        setInputCantidad(gasto.cantidad)
        setFecha(fromUnixTime(gasto.fecha))
      } else {
        navigate('/lista')
      }
    }
  }, [gasto, usuario, navigate])

  const handleChange = (e) => {
    if (e.target.name === 'descripcion') {
      setInputDescricion(e.target.value)
    } else if (e.target.name === 'cantidad') {
      setInputCantidad(e.target.value.replace(/[^0-9.]/g, ''))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let cantidad = parseFloat(inputCantidad).toFixed(2)

    // Comprobamos que haya una descripcion y valor
    if (inputDescricion !== '' && inputCantidad !== '') {
      if (cantidad) {
        if (gasto) {
          editarGasto({
            id: idGasto,
            categoria,
            descripcion: inputDescricion,
            cantidad,
            fecha: getUnixTime(fecha),
          })
            .then(() => navigate('/lista'))
            .catch(() => {
              setEstadoAlerta(true)
              setAlerta({
                tipo: 'error',
                mensaje: 'Hubo un problema al intentar editar tu gasto',
              })
            })
        } else {
          agregarGasto({
            descripcion: inputDescricion,
            cantidad: Number(cantidad),
            categoria,
            fecha: getUnixTime(fecha),
            usuario: usuario.uid,
          })
            .then(() => {
              setInputDescricion('')
              setInputCantidad('')
              setCategoria('hogar')
              setFecha(new Date())
              setEstadoAlerta(true)
              setAlerta({
                tipo: 'exito',
                mensaje: 'El gasto se guardó correctamente',
              })
            })
            .catch(() => {
              setEstadoAlerta(true)
              setAlerta({
                tipo: 'error',
                mensaje: 'Hubo un problema al intentar agregar tu gasto',
              })
            })
        }
      } else {
        setEstadoAlerta(true)
        setAlerta({
          tipo: 'error',
          mensaje: 'El valor que ingresaste no es correcto',
        })
      }
    } else {
      setEstadoAlerta(true)
      setAlerta({
        tipo: 'error',
        mensaje: 'Por favor rellena todos los campos',
      })
    }
  }

  return (
    <Formulario onSubmit={handleSubmit}>
      <ContenedorFiltros>
        <SelectCategorias categoria={categoria} setCategoria={setCategoria} />
        <DatePicker fecha={fecha} setFecha={setFecha} />
      </ContenedorFiltros>
      <div>
        <Input
          type="text"
          name="descripcion"
          id="descripcion"
          placeholder="Descripción "
          value={inputDescricion}
          onChange={handleChange}
        />
        <InputGrande
          type="text"
          name="cantidad"
          id="cantidad"
          placeholder="$0.00"
          value={inputCantidad}
          onChange={handleChange}
        />
      </div>
      <ContenedorBoton>
        <Boton as="button" primario conIcono type="submit">
          {gasto ? 'Editar gasto' : 'Agregar gasto'} <IconoPlus />
        </Boton>
      </ContenedorBoton>
      <Alerta
        tipo={alerta.tipo}
        mensaje={alerta.mensaje}
        estadoAlerta={estadoAlerta}
        setEstadoAlerta={setEstadoAlerta}
      />
    </Formulario>
  )
}

export default FormularioGasto
